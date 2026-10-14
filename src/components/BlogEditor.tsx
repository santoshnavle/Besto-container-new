import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, BlogCategory } from '../types';
import { generateSlug, uploadBlogImage } from '../services/blogService';
import {
  Save,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  Upload,
  Eye,
  Edit3,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  X,
  ExternalLink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Sparkles,
  HelpCircle,
  Link2,
  Check,
} from 'lucide-react';
import DOMPurify, { Config } from 'dompurify';

// Helper to strictly validate HTTPS image URLs and reject executable or non-https schemes
export function validateHttpsUrl(input: string): { isValid: boolean; error?: string } {
  const trimmed = (input || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter an image URL.' };
  }
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:') ||
    lower.startsWith('blob:')
  ) {
    return {
      isValid: false,
      error: 'Insecure URL scheme detected. Executable, data, and file URL schemes are not permitted.',
    };
  }
  if (!lower.startsWith('https://')) {
    return {
      isValid: false,
      error: 'Only secure HTTPS image URLs are accepted (must start with https://).',
    };
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return { isValid: false, error: 'Only secure HTTPS protocol is permitted.' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format. Please enter a valid web link starting with https://' };
  }
}

export interface ExtractedInlineImage {
  src: string;
  alt: string;
  fullTag: string;
}

export function extractInlineImages(htmlContent: string): ExtractedInlineImage[] {
  if (!htmlContent) return [];
  const images: ExtractedInlineImage[] = [];
  const figureRegex = /<figure[\s\S]*?<img[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:alt=["']([^"']*)["'])?[\s\S]*?<\/figure>/gi;
  let match: RegExpExecArray | null;
  const processedUrls = new Set<string>();

  while ((match = figureRegex.exec(htmlContent)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    const alt = match[2] || '';
    images.push({ src, alt, fullTag });
    processedUrls.add(src);
  }

  const standaloneImgRegex = /<img[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:alt=["']([^"']*)["'])?[\s\S]*?\/?>/gi;
  while ((match = standaloneImgRegex.exec(htmlContent)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    const alt = match[2] || '';
    if (!processedUrls.has(src)) {
      images.push({ src, alt, fullTag });
      processedUrls.add(src);
    }
  }

  return images;
}

// Configured DOMPurify options to allow images, figures, captions, and links safely (HTTPS only)
const SANITIZE_CONFIG: Config = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'u', 's',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'br',
    'a', 'img', 'figure', 'figcaption', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style', 'loading', 'width', 'height', 'target', 'rel'],
  ALLOWED_URI_REGEXP: /^(?:(?:https|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  ALLOW_DATA_ATTR: false,
};

export interface BlogEditorProps {
  initialPost?: BlogPost | null;
  categories: BlogCategory[];
  onSave: (postData: Omit<BlogPost, 'id'>, postId?: string) => Promise<void>;
  onCancel: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialPost,
  categories,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialPost?.slug));
  const [category, setCategory] = useState(initialPost?.category || (categories[0]?.name || 'Industrial Packaging Selection'));
  const [tags, setTags] = useState(initialPost?.tags || '');
  const [author, setAuthor] = useState(initialPost?.author || 'Besto Technical Team');
  const [authorEmail, setAuthorEmail] = useState(initialPost?.authorEmail || 'sales@bestosia.com');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  
  // Featured / Cover Image State
  const [featuredImageSource, setFeaturedImageSource] = useState<'url' | 'upload'>('url');
  const [featuredImageUrlInput, setFeaturedImageUrlInput] = useState(initialPost?.coverImageUrl || '');
  const [featuredUrlValidationError, setFeaturedUrlValidationError] = useState<string | null>(null);
  const [featuredImageLoadError, setFeaturedImageLoadError] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl || '');
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(initialPost?.coverImageUrl || '');
  const [imageAlt, setImageAlt] = useState(initialPost?.imageAlt || '');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [coverUploadSuccess, setCoverUploadSuccess] = useState<string | null>(null);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialPost?.status || 'published');

  // UI state
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Body Image Insertion Modal State
  const [isBodyImageModalOpen, setIsBodyImageModalOpen] = useState(false);
  const [bodyImageMode, setBodyImageMode] = useState<'upload' | 'url'>('url');
  const [bodyImageFile, setBodyImageFile] = useState<File | null>(null);
  const [bodyImagePreviewUrl, setBodyImagePreviewUrl] = useState('');
  const [bodyImageUrlInput, setBodyImageUrlInput] = useState('');
  const [bodyImageAlt, setBodyImageAlt] = useState('');
  const [bodyImageCaption, setBodyImageCaption] = useState('');
  const [bodyImageAlign, setBodyImageAlign] = useState<'center' | 'full' | 'left' | 'right'>('center');
  const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
  const [bodyImageUploadProgress, setBodyImageUploadProgress] = useState(0);
  const [bodyImageModalError, setBodyImageModalError] = useState<string | null>(null);

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const bodyFileInputRef = useRef<HTMLInputElement>(null);
  const featuredUrlInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title if not manually customized
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setIsDirty(true);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));
    }
    if (!seoTitle) {
      setSeoTitle(val ? `${val} | Besto Container Industries` : '');
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setIsDirty(true);
    setSlug(generateSlug(e.target.value));
  };

  // Warn before navigating away from unsaved modifications
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Clean up object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
      if (bodyImagePreviewUrl && bodyImagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(bodyImagePreviewUrl);
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // Featured Image: URL Input Handlers (Alternative to Firebase Storage)
  // --------------------------------------------------------------------------
  const handleFeaturedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFeaturedImageUrlInput(val);
    setFeaturedImageLoadError(null);
    setCoverUploadError(null);
    setCoverUploadSuccess(null);
    setIsDirty(true);

    if (!val.trim()) {
      setFeaturedUrlValidationError(null);
      setCoverImageUrl('');
      setCoverPreviewUrl('');
      return;
    }

    const validation = validateHttpsUrl(val);
    if (!validation.isValid) {
      setFeaturedUrlValidationError(validation.error || 'Please enter a valid HTTPS URL.');
      setCoverImageUrl('');
      setCoverPreviewUrl('');
      return;
    }

    // Valid HTTPS URL!
    setFeaturedUrlValidationError(null);
    setCoverImageUrl(val.trim());
    setCoverPreviewUrl(val.trim());
    if (!imageAlt && title) {
      setImageAlt(`${title} featured cover`);
    }
    // IMPORTANT: No Firebase Storage upload is initiated
  };

  const handleReplaceFeaturedUrl = () => {
    setFeaturedImageUrlInput('');
    setCoverImageUrl('');
    setCoverPreviewUrl('');
    setFeaturedUrlValidationError(null);
    setFeaturedImageLoadError(null);
    setCoverUploadError(null);
    setCoverUploadSuccess(null);
    setIsDirty(true);
    setTimeout(() => {
      featuredUrlInputRef.current?.focus();
    }, 50);
  };

  const handleClearFeaturedImage = () => {
    if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(coverPreviewUrl);
    }
    setCoverImageUrl('');
    setCoverPreviewUrl('');
    setFeaturedImageUrlInput('');
    setImageAlt('');
    setFeaturedUrlValidationError(null);
    setFeaturedImageLoadError(null);
    setCoverUploadError(null);
    setCoverUploadSuccess(null);
    setIsDirty(true);
    if (coverFileInputRef.current) coverFileInputRef.current.value = '';
  };

  // --------------------------------------------------------------------------
  // Featured Image: File Selection & Firebase Storage Upload
  // --------------------------------------------------------------------------
  const handleCoverFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverUploadError(null);
    setCoverUploadSuccess(null);
    setFeaturedImageLoadError(null);
    setFeaturedUrlValidationError(null);

    // 1. Validate file format: JPG, JPEG, PNG, WebP
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validExtensions = /\.(jpe?g|png|webp)$/i;
    if (!validMimeTypes.includes(file.type.toLowerCase()) && !validExtensions.test(file.name)) {
      setCoverUploadError('Unsupported image format. Please select a JPG, PNG, or WebP file.');
      if (coverFileInputRef.current) coverFileInputRef.current.value = '';
      return;
    }

    // 2. Validate file size <= 5 MB
    const MAX_SIZE_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setCoverUploadError(`Image size exceeds the 5MB limit. Selected file is ${sizeMB} MB. Please choose a smaller file.`);
      if (coverFileInputRef.current) coverFileInputRef.current.value = '';
      return;
    }

    // 3. Show immediate local preview before saving
    const localBlobUrl = URL.createObjectURL(file);
    setCoverPreviewUrl(localBlobUrl);
    if (!imageAlt) {
      setImageAlt(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
    setIsDirty(true);

    // 4. Upload to Firebase Storage with live progress percentage
    try {
      setUploadingCover(true);
      setCoverUploadProgress(0);
      const downloadUrl = await uploadBlogImage(file, (pct) => {
        setCoverUploadProgress(pct);
      });
      setCoverImageUrl(downloadUrl);
      setCoverPreviewUrl(downloadUrl);
      setFeaturedImageUrlInput(downloadUrl);
      setCoverUploadSuccess('Featured image successfully uploaded to Firebase Storage.');
      setIsDirty(true);
    } catch (err: any) {
      console.error('Featured image upload failed:', err);
      setCoverUploadError(err?.message || 'Failed to upload image to Firebase Storage.');
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = '';
    }
  };

  // --------------------------------------------------------------------------
  // Rich Text Insertion Helper
  // --------------------------------------------------------------------------
  const insertFormatting = (prefix: string, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = prefix + (selected || 'Text') + suffix;

    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setContent(newContent);
    setIsDirty(true);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 50);
  };

  // Helper to remove an inline image from the article body
  const inlineImagesInArticle = extractInlineImages(content);

  const handleRemoveInlineImage = (imageItem: ExtractedInlineImage) => {
    const updatedContent = content.replace(imageItem.fullTag, '').replace(/\n\s*\n\s*\n/g, '\n\n');
    setContent(updatedContent);
    setIsDirty(true);
  };

  // --------------------------------------------------------------------------
  // Body Image Insertion Modal Handlers
  // --------------------------------------------------------------------------
  const handleOpenInsertImageUrlModal = () => {
    setBodyImageMode('url');
    setBodyImageFile(null);
    setBodyImagePreviewUrl('');
    setBodyImageUrlInput('');
    setBodyImageAlt('');
    setBodyImageCaption('');
    setBodyImageAlign('center');
    setBodyImageModalError(null);
    setBodyImageUploadProgress(0);
    setIsBodyImageModalOpen(true);
  };

  const handleOpenUploadImageModal = () => {
    setBodyImageMode('upload');
    setBodyImageFile(null);
    setBodyImagePreviewUrl('');
    setBodyImageUrlInput('');
    setBodyImageAlt('');
    setBodyImageCaption('');
    setBodyImageAlign('center');
    setBodyImageModalError(null);
    setBodyImageUploadProgress(0);
    setIsBodyImageModalOpen(true);
  };

  const handleBodyFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBodyImageModalError(null);

    // Validate type
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validExtensions = /\.(jpe?g|png|webp)$/i;
    if (!validMimeTypes.includes(file.type.toLowerCase()) && !validExtensions.test(file.name)) {
      setBodyImageModalError('Unsupported image format. Please select a JPG, PNG, or WebP file.');
      return;
    }

    // Validate size <= 5MB
    if (file.size > 5 * 1024 * 1024) {
      setBodyImageModalError(`Image exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`);
      return;
    }

    setBodyImageFile(file);
    const blobUrl = URL.createObjectURL(file);
    setBodyImagePreviewUrl(blobUrl);
    if (!bodyImageAlt) {
      setBodyImageAlt(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  const handleInsertBodyImage = async () => {
    let finalImageUrl = '';

    if (bodyImageMode === 'upload') {
      if (!bodyImageFile) {
        setBodyImageModalError('Please choose an image file from your computer to upload.');
        return;
      }
      try {
        setUploadingBodyImage(true);
        setBodyImageUploadProgress(0);
        finalImageUrl = await uploadBlogImage(bodyImageFile, (pct) => {
          setBodyImageUploadProgress(pct);
        });
      } catch (err: any) {
        setBodyImageModalError(err?.message || 'Failed to upload body image to Firebase Storage.');
        setUploadingBodyImage(false);
        return;
      } finally {
        setUploadingBodyImage(false);
      }
    } else {
      // Direct HTTPS URL mode
      if (!bodyImageUrlInput.trim()) {
        setBodyImageModalError('Please enter a valid image web URL.');
        return;
      }
      const validation = validateHttpsUrl(bodyImageUrlInput);
      if (!validation.isValid) {
        setBodyImageModalError(validation.error || 'Please provide a valid HTTPS image URL.');
        return;
      }
      finalImageUrl = bodyImageUrlInput.trim();
      // CRITICAL: NO Firebase Storage upload is started
    }

    // Build responsive HTML figure based on selected alignment
    const altAttr = (bodyImageAlt.trim() || 'Besto industrial packaging documentation').replace(/"/g, '&quot;');
    const captionClean = bodyImageCaption.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const captionHtml = captionClean
      ? `\n  <figcaption class="text-xs text-slate-500 mt-2 italic text-center">${captionClean}</figcaption>`
      : '';

    let figureSnippet = '';
    if (bodyImageAlign === 'full') {
      figureSnippet = `\n<figure class="my-8 text-center w-full">\n  <img src="${finalImageUrl}" alt="${altAttr}" class="rounded-2xl mx-auto shadow-md w-full max-h-[520px] object-cover" loading="lazy" />${captionHtml}\n</figure>\n`;
    } else if (bodyImageAlign === 'left') {
      figureSnippet = `\n<figure class="my-4 sm:float-left sm:mr-6 sm:mb-4 sm:max-w-xs text-center">\n  <img src="${finalImageUrl}" alt="${altAttr}" class="rounded-xl shadow-md w-full object-cover" loading="lazy" />${captionHtml}\n</figure>\n`;
    } else if (bodyImageAlign === 'right') {
      figureSnippet = `\n<figure class="my-4 sm:float-right sm:ml-6 sm:mb-4 sm:max-w-xs text-center">\n  <img src="${finalImageUrl}" alt="${altAttr}" class="rounded-xl shadow-md w-full object-cover" loading="lazy" />${captionHtml}\n</figure>\n`;
    } else {
      // standard center
      figureSnippet = `\n<figure class="my-8 text-center max-w-2xl mx-auto">\n  <img src="${finalImageUrl}" alt="${altAttr}" class="rounded-xl mx-auto shadow-md max-h-[460px] object-cover" loading="lazy" />${captionHtml}\n</figure>\n`;
    }

    // Insert into content at cursor position
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentVal = textarea.value;
      const updated = currentVal.substring(0, start) + figureSnippet + currentVal.substring(end);
      setContent(updated);
      setIsDirty(true);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + figureSnippet.length, start + figureSnippet.length);
      }, 50);
    } else {
      setContent((prev) => prev + figureSnippet);
      setIsDirty(true);
    }

    setIsBodyImageModalOpen(false);
  };

  // --------------------------------------------------------------------------
  // Form Submission
  // --------------------------------------------------------------------------
  const handleSubmit = async (submitStatus: 'draft' | 'published') => {
    if (uploadingCover || uploadingBodyImage) {
      setError('Please wait for image uploads to complete before saving.');
      return;
    }
    if (!title.trim()) {
      setError('Article Title is required.');
      return;
    }
    if (!slug.trim()) {
      setError('URL slug is required.');
      return;
    }
    if (!content.trim()) {
      setError('Article content cannot be empty.');
      return;
    }

    if (featuredUrlValidationError) {
      setError(`Featured Image URL error: ${featuredUrlValidationError}`);
      return;
    }

    const effectiveCoverUrl = (coverImageUrl.trim() || featuredImageUrlInput.trim());
    if (effectiveCoverUrl) {
      const coverVal = validateHttpsUrl(effectiveCoverUrl);
      if (!coverVal.isValid) {
        setError(`Featured Image URL is invalid: ${coverVal.error}`);
        return;
      }
    }

    try {
      setIsSaving(true);
      setError(null);

      const postPayload: Omit<BlogPost, 'id'> = {
        title: title.trim(),
        slug: slug.trim(),
        category,
        tags: tags.trim(),
        author: author.trim() || 'Besto Technical Team',
        authorEmail: authorEmail.trim(),
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        coverImageUrl: effectiveCoverUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        imageAlt: imageAlt.trim() || title.trim(),
        seoTitle: seoTitle.trim() || `${title.trim()} | Besto Container Industries`,
        seoDescription: seoDescription.trim() || excerpt.trim().slice(0, 160),
        status: submitStatus,
        publishedAt: submitStatus === 'published' ? (initialPost?.publishedAt || new Date().toISOString()) : undefined,
        createdAt: initialPost?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onSave(postPayload, initialPost?.id);
      setIsDirty(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to save blog post to database.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    if (isDirty) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to exit without saving?')) {
        return;
      }
    }
    onCancel();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
      {/* Top Action Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancelClick}
            disabled={uploadingCover || isSaving}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Return to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              {initialPost ? 'Edit Blog Article' : 'Compose New Blog Post'}
            </h2>
            <p className="text-xs text-slate-300">
              Live Firestore integration · Besto Container Knowledge Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            disabled={uploadingCover || isSaving}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 ${
              isPreview
                ? 'bg-[#F15A24] text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {isPreview ? <Edit3 size={14} /> : <Eye size={14} />}
            <span>{isPreview ? 'Back to Editor' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={isSaving || uploadingCover || uploadingBodyImage}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={isSaving || uploadingCover || uploadingBodyImage}
            className="px-5 py-2 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md hover:shadow-orange-500/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send size={14} />
            <span>{isSaving ? 'Saving...' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <p className="font-semibold">Unable to process blog article:</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Main Body */}
      {isPreview ? (
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F15A24]">
            <span className="px-2.5 py-1 bg-orange-100 rounded-full">{category}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">
              {status === 'published' ? 'Ready to Publish' : 'Draft Preview'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {title || 'Untitled Industrial Article'}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 pb-6 mb-6 border-b border-slate-200">
            <span>By {author || 'Besto Technical Desk'}</span>
            <span>·</span>
            <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>

          {(coverPreviewUrl || coverImageUrl) && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm max-h-[420px] bg-slate-900">
              <img
                src={coverPreviewUrl || coverImageUrl}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {excerpt && (
            <p className="text-lg font-medium text-slate-700 italic border-l-4 border-[#F15A24] pl-4 py-1 mb-8 bg-orange-50/40 rounded-r-lg">
              {excerpt}
            </p>
          )}

          <div
            className="prose prose-slate max-w-none 
              prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:mt-8 prose-h2:mb-4 
              prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700
              prose-img:rounded-xl prose-img:shadow-md prose-figure:my-6 prose-figcaption:text-xs prose-figcaption:text-slate-500"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                content || '<p class="text-slate-400 italic">No article content typed yet.</p>',
                SANITIZE_CONFIG
              ),
            }}
          />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(status);
          }}
          className="p-6 md:p-8 space-y-8"
        >
          {/* Section 1: Core Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Standard UN Drop Test Procedures for 210L Reconditioned Steel Barrels"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-semibold text-slate-900 focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 focus-within:bg-white focus-within:border-[#F15A24] focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                  <span className="text-xs font-mono text-slate-400 select-none">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="standard-un-drop-test-steel-barrels"
                    className="w-full py-2.5 px-1 bg-transparent text-xs font-mono text-slate-800 outline-none"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Unique, search-engine friendly URL parameter. Letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Excerpt / Summary <span className="text-slate-400 font-normal">(For cards & search)</span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => {
                    setExcerpt(e.target.value);
                    setIsDirty(true);
                  }}
                  rows={3}
                  maxLength={600}
                  placeholder="Concise 2-3 sentence overview of the technical guide..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Summarizes the topic on the blog listing and metadata.</span>
                  <span>{excerpt.length}/600</span>
                </div>
              </div>
            </div>

            {/* Sidebar Meta Info */}
            <div className="md:col-span-4 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                Publishing Details
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:border-[#F15A24] outline-none"
                >
                  {category && !categories.some((c) => c.name === category) && (
                    <option value={category}>{category}</option>
                  )}
                  {categories.map((c) => (
                    <option key={c.id || c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Besto Technical Team"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-[#F15A24] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keywords / Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="drums, ZLD, reconditioning, steel"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-[#F15A24] outline-none"
                />
                <span className="text-[10px] text-slate-400">Comma-separated</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Publication Status</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('published');
                      setIsDirty(true);
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'published'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    <span>Published</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('draft');
                      setIsDirty(true);
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'draft'
                        ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>Draft</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Featured Cover Image Management */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ImageIcon size={15} className="text-[#F15A24]" />
                  <span>Featured Cover Image</span>
                  <span className="text-[11px] font-normal text-slate-500 lowercase">(card & hero display)</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Specify an HTTPS image web URL or choose a local file to upload.
                </p>
              </div>

              {/* Source Mode Toggle */}
              <div className="inline-flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFeaturedImageSource('url')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                    featuredImageSource === 'url'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Link2 size={13} className={featuredImageSource === 'url' ? 'text-[#F15A24]' : ''} />
                  <span>Direct Image URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedImageSource('upload')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                    featuredImageSource === 'upload'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload size={13} className={featuredImageSource === 'upload' ? 'text-[#F15A24]' : ''} />
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {/* Error & Success Alerts */}
            {featuredUrlValidationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1">
                  <span className="font-bold">Invalid Image URL: </span>
                  <span>{featuredUrlValidationError}</span>
                </div>
              </div>
            )}

            {featuredImageLoadError && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-800 text-xs">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                <div className="flex-1">
                  <span className="font-bold">Image Preview Notice: </span>
                  <span>{featuredImageLoadError}</span>
                </div>
              </div>
            )}

            {coverUploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1">
                  <span className="font-bold">Image Upload Notice: </span>
                  <span>{coverUploadError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCoverUploadError(null)}
                  className="text-red-400 hover:text-red-700 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {coverUploadSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-xs">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                <span className="flex-1 font-medium">{coverUploadSuccess}</span>
                <button
                  type="button"
                  onClick={() => setCoverUploadSuccess(null)}
                  className="text-emerald-400 hover:text-emerald-700 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Upload Progress Bar (Only during Firebase Storage uploads) */}
            {uploadingCover && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-orange-800">
                  <span className="flex items-center gap-2">
                    <RefreshCw size={13} className="animate-spin text-[#F15A24]" />
                    <span>Uploading featured image to Firebase Storage...</span>
                  </span>
                  <span>{coverUploadProgress}%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#F15A24] h-2 rounded-full transition-all duration-200"
                    style={{ width: `${coverUploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image Preview & Actions Card */}
              <div className="md:col-span-5 space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-3">
                  {coverPreviewUrl ? (
                    <>
                      <img
                        src={coverPreviewUrl}
                        alt={imageAlt || 'Cover image preview'}
                        className="w-full h-full object-cover"
                        onLoad={() => setFeaturedImageLoadError(null)}
                        onError={() => {
                          setFeaturedImageLoadError(
                            'Unable to load image from this URL. Please verify the URL is public, accessible, and points to a valid image file.'
                          );
                        }}
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleReplaceFeaturedUrl}
                          className="px-2 py-1 bg-black/75 hover:bg-slate-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                          title="Replace URL"
                        >
                          <RefreshCw size={12} />
                          <span>Replace</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleClearFeaturedImage}
                          className="p-1.5 bg-black/75 hover:bg-red-600 text-white rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                          title="Clear Image"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-0.5 bg-black/70 text-white text-[10px] rounded backdrop-blur-xs font-medium flex items-center gap-1">
                          <Check size={11} className="text-emerald-400" />
                          <span>Preview Active</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-400 p-2">
                      <ImageIcon size={36} className="mx-auto mb-2 opacity-60" />
                      <p className="text-xs font-semibold text-slate-700">No Featured Image Selected</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {featuredImageSource === 'url'
                          ? 'Paste a direct HTTPS image URL in the field on the right'
                          : 'Choose a photo from your computer (JPG, PNG, WebP)'}
                      </p>
                    </div>
                  )}
                </div>

                {/* File picker buttons (When in upload mode) */}
                {featuredImageSource === 'upload' && (
                  <div>
                    <input
                      type="file"
                      ref={coverFileInputRef}
                      onChange={handleCoverFileSelect}
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        disabled={uploadingCover}
                        className="flex-1 py-2.5 px-3 bg-white border border-slate-300 hover:border-[#F15A24] text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                      >
                        {uploadingCover ? (
                          <>
                            <RefreshCw size={13} className="animate-spin text-[#F15A24]" />
                            <span>Uploading ({coverUploadProgress}%)...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={14} className="text-[#F15A24]" />
                            <span>{coverPreviewUrl ? 'Choose Different Image' : 'Select Image from Computer'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* URL & Alt Text Controls */}
              <div className="md:col-span-7 space-y-4">
                {/* 1. Explicit Featured Image URL field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">
                      Featured Image URL <span className="text-[#F15A24] font-normal">(HTTPS direct link)</span>
                    </label>
                    {featuredImageUrlInput && (
                      <button
                        type="button"
                        onClick={handleReplaceFeaturedUrl}
                        className="text-[11px] font-semibold text-[#F15A24] hover:underline cursor-pointer"
                      >
                        Replace URL
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <input
                      ref={featuredUrlInputRef}
                      type="url"
                      value={featuredImageUrlInput}
                      onChange={handleFeaturedUrlChange}
                      placeholder="https://images.unsplash.com/... or https://domain.com/photo.jpg"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs font-mono text-slate-800 outline-none transition-all pr-24 ${
                        featuredUrlValidationError
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-300 focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100'
                      }`}
                    />
                    {featuredImageUrlInput && (
                      <div className="absolute right-2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handleReplaceFeaturedUrl}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded cursor-pointer"
                          title="Clear and replace with new URL"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={handleClearFeaturedImage}
                          className="p-1 hover:text-red-600 text-slate-400 cursor-pointer"
                          title="Clear image"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Accepts direct HTTPS image URLs. URL entry is independent and does not upload to Firebase Storage.
                  </p>
                </div>

                {/* Alt Text Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Image Alt Text <span className="text-slate-400 font-normal">(Crucial for SEO & Accessibility)</span>
                  </label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => {
                      setImageAlt(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="e.g. Quality inspection of BESTOSIA reconditioned open-top steel barrels"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Describe the image concisely for search engines, screen readers, and image previews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Article Content & Formatting Bar (With Image Insertion Inside Body) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Supports rich HTML formatting & multiple inline images</span>
            </div>

            {/* Quick Action Formatting Toolbar */}
            <div className="bg-slate-100 border border-slate-300 border-b-0 rounded-t-xl p-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-700">
              <button
                type="button"
                onClick={() => insertFormatting('<h2>', '</h2>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] font-bold rounded border border-slate-200 transition-colors cursor-pointer"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<h3>', '</h3>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] font-bold rounded border border-slate-200 transition-colors cursor-pointer"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<strong>', '</strong>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] font-bold rounded border border-slate-200 transition-colors cursor-pointer"
                title="Bold"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<em>', '</em>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] italic rounded border border-slate-200 transition-colors cursor-pointer"
                title="Italic"
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] rounded border border-slate-200 transition-colors cursor-pointer"
                title="Bullet List"
              >
                • Bullet List
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<ol>\n  <li>', '</li>\n  <li>Step 2</li>\n</ol>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] rounded border border-slate-200 transition-colors cursor-pointer"
                title="Numbered List"
              >
                1. Numbered List
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<blockquote class="border-l-4 border-[#F15A24] pl-4 italic my-4">\n  ', '\n</blockquote>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] rounded border border-slate-200 transition-colors cursor-pointer"
                title="Callout Quote"
              >
                “ Quote
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<a href="https://example.com" class="text-[#F15A24] underline">', '</a>')}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] rounded border border-slate-200 transition-colors cursor-pointer"
                title="Link"
              >
                Link
              </button>

              <span className="w-px h-5 bg-slate-300 mx-1" />

              {/* Requirement 2: Insert Image URL Button */}
              <button
                type="button"
                onClick={handleOpenInsertImageUrlModal}
                className="px-3 py-1 bg-white hover:bg-orange-50 hover:text-[#F15A24] text-slate-800 font-bold rounded border border-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Insert Image from Web URL"
              >
                <Link2 size={13} className="text-[#F15A24]" />
                <ImageIcon size={13} className="text-[#F15A24]" />
                <span>Insert Image URL</span>
              </button>

              <button
                type="button"
                onClick={handleOpenUploadImageModal}
                className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-600 rounded border border-slate-200 flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                title="Upload Image from Computer (Firebase Storage)"
              >
                <Upload size={12} />
                <span>Upload File</span>
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setIsDirty(true);
              }}
              rows={14}
              placeholder="<p>Type your industrial article, headings, bullet lists, and technical guidance here...</p>"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-b-xl font-mono text-xs text-slate-800 leading-relaxed focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              required
            />

            {/* Requirement 2: Interactive Inline Images Management (Allows viewing and removing inserted images) */}
            {inlineImagesInArticle.length > 0 && (
              <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-[#F15A24]" />
                    <span>Images Embedded in Article Body ({inlineImagesInArticle.length})</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Click the trash button to remove an image from the article
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {inlineImagesInArticle.map((imgItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 shadow-2xs group"
                    >
                      <img
                        src={imgItem.src}
                        alt={imgItem.alt || 'Inline preview'}
                        className="w-12 h-12 rounded object-cover border border-slate-200 bg-slate-100 shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-slate-800 truncate" title={imgItem.alt || imgItem.src}>
                          {imgItem.alt || 'No alt text provided'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate" title={imgItem.src}>
                          {imgItem.src}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInlineImage(imgItem)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer shrink-0"
                        title="Remove this image from article body"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Search Engine Optimization (SEO) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles size={15} className="text-[#F7941D]" />
              <span>Search Engine Optimization (SEO)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  SEO Meta Title <span className="text-slate-400 font-normal">(60 chars recommended)</span>
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Reconditioned Drums vs New Barrels Guide | Besto"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-[#F15A24] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  SEO Meta Description <span className="text-slate-400 font-normal">(160 chars recommended)</span>
                </label>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Compare pricing, UN certifications, and sustainability for refurbished vs new drums."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-[#F15A24] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCancelClick}
              disabled={isSaving || uploadingCover}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={isSaving || uploadingCover || uploadingBodyImage}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSaving || uploadingCover || uploadingBodyImage}
                className="px-6 py-2.5 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-orange-500/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? 'Processing...' : 'Publish Article Now'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* Requirement 2: Insert Image Inside Body Content Modal */}
      {/* --------------------------------------------------------------------- */}
      {isBodyImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F15A24]/20 border border-[#F15A24]/40 flex items-center justify-center">
                  <ImageIcon size={16} className="text-[#F15A24]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Insert Image into Article Body</h3>
                  <p className="text-[11px] text-slate-300">
                    Upload from computer or link a web image with layout control
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBodyImageModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Tabs: Direct HTTPS URL vs Upload */}
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setBodyImageMode('url');
                    setBodyImageModalError(null);
                  }}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    bodyImageMode === 'url'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Link2 size={14} className={bodyImageMode === 'url' ? 'text-[#F15A24]' : ''} />
                  <span>Insert Image URL (HTTPS)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBodyImageMode('upload');
                    setBodyImageModalError(null);
                  }}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    bodyImageMode === 'upload'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload size={14} className={bodyImageMode === 'upload' ? 'text-[#F15A24]' : ''} />
                  <span>Upload File (Firebase)</span>
                </button>
              </div>

              {bodyImageModalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
                  <span className="flex-1">{bodyImageModalError}</span>
                </div>
              )}

              {/* Upload Progress (Only for Firebase file upload) */}
              {uploadingBodyImage && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-orange-800">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw size={13} className="animate-spin text-[#F15A24]" />
                      <span>Uploading body image to Firebase Storage...</span>
                    </span>
                    <span>{bodyImageUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#F15A24] h-2 rounded-full transition-all duration-200"
                      style={{ width: `${bodyImageUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Mode 1: Direct HTTPS URL (Instant & Independent) */}
              {bodyImageMode === 'url' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Image URL <span className="text-red-500">*</span>
                      <span className="text-slate-400 font-normal"> (HTTPS only, e.g. https://images.unsplash.com/...)</span>
                    </label>
                    <input
                      type="url"
                      value={bodyImageUrlInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBodyImageUrlInput(val);
                        if (val.trim()) {
                          const valRes = validateHttpsUrl(val);
                          if (!valRes.isValid) {
                            setBodyImageModalError(valRes.error || 'Please enter a valid HTTPS URL.');
                          } else {
                            setBodyImageModalError(null);
                          }
                        } else {
                          setBodyImageModalError(null);
                        }
                      }}
                      placeholder="https://images.unsplash.com/... or https://domain.com/photo.jpg"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-[#F15A24] outline-none transition-all"
                      autoFocus
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Accepts direct HTTPS image URLs. URL entry does not trigger a Firebase Storage upload.
                    </p>
                  </div>

                  {bodyImageUrlInput && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-600">Image Preview:</div>
                      <div className="aspect-video max-h-48 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                        <img
                          src={bodyImageUrlInput}
                          alt="URL preview"
                          className="w-full h-full object-contain"
                          onLoad={() => setBodyImageModalError(null)}
                          onError={() => {
                            setBodyImageModalError('Could not load image from the specified URL. Please check the address.');
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Mode 2: File Upload to Firebase Storage */
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={bodyFileInputRef}
                    onChange={handleBodyFileSelect}
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    className="hidden"
                  />

                  <div
                    onClick={() => bodyFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#F15A24] bg-slate-50 hover:bg-orange-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all"
                  >
                    {bodyImagePreviewUrl ? (
                      <div className="space-y-3">
                        <img
                          src={bodyImagePreviewUrl}
                          alt="Body image preview"
                          className="max-h-48 mx-auto rounded-xl object-contain shadow-xs"
                        />
                        <div className="text-xs text-slate-600 font-medium">
                          <span className="font-bold text-slate-900">{bodyImageFile?.name}</span>
                          <span className="text-slate-400"> · </span>
                          <span>{bodyImageFile ? (bodyImageFile.size / (1024 * 1024)).toFixed(2) + ' MB' : ''}</span>
                        </div>
                        <p className="text-[11px] text-[#F15A24] font-semibold">
                          Click to select a different image file
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload size={32} className="mx-auto text-slate-400" />
                        <p className="text-xs font-bold text-slate-800">
                          Click here to choose an image from your computer
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Supported: JPG, JPEG, PNG, WebP · Max 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Alt Text and Caption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alt Text <span className="text-slate-400 font-normal">(Crucial for Accessibility & SEO)</span>
                  </label>
                  <input
                    type="text"
                    value={bodyImageAlt}
                    onChange={(e) => setBodyImageAlt(e.target.value)}
                    placeholder="e.g. Steel barrel drop test pressure gauge"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-[#F15A24] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Image Caption <span className="text-slate-400 font-normal">(Optional below image)</span>
                  </label>
                  <input
                    type="text"
                    value={bodyImageCaption}
                    onChange={(e) => setBodyImageCaption(e.target.value)}
                    placeholder="e.g. Fig 1: Hydrostatic test apparatus"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-[#F15A24] outline-none"
                  />
                </div>
              </div>

              {/* Alignment Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alignment & Size in Article
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setBodyImageAlign('center')}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] font-semibold cursor-pointer transition-colors ${
                      bodyImageAlign === 'center'
                        ? 'border-[#F15A24] bg-orange-50 text-[#F15A24]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <AlignCenter size={14} className="mx-auto mb-1" />
                    <span>Center</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBodyImageAlign('full')}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] font-semibold cursor-pointer transition-colors ${
                      bodyImageAlign === 'full'
                        ? 'border-[#F15A24] bg-orange-50 text-[#F15A24]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Maximize2 size={14} className="mx-auto mb-1" />
                    <span>Full Width</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBodyImageAlign('left')}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] font-semibold cursor-pointer transition-colors ${
                      bodyImageAlign === 'left'
                        ? 'border-[#F15A24] bg-orange-50 text-[#F15A24]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <AlignLeft size={14} className="mx-auto mb-1" />
                    <span>Left Float</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBodyImageAlign('right')}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] font-semibold cursor-pointer transition-colors ${
                      bodyImageAlign === 'right'
                        ? 'border-[#F15A24] bg-orange-50 text-[#F15A24]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <AlignRight size={14} className="mx-auto mb-1" />
                    <span>Right Float</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsBodyImageModalOpen(false)}
                disabled={uploadingBodyImage}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertBodyImage}
                disabled={
                  uploadingBodyImage ||
                  (bodyImageMode === 'upload' && !bodyImageFile) ||
                  (bodyImageMode === 'url' && !bodyImageUrlInput.trim())
                }
                className="px-5 py-2 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {uploadingBodyImage ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Uploading ({bodyImageUploadProgress}%)...</span>
                  </>
                ) : bodyImageMode === 'url' ? (
                  <>
                    <Link2 size={13} />
                    <span>Insert Image URL</span>
                  </>
                ) : (
                  <>
                    <Upload size={13} />
                    <span>Upload & Insert</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
