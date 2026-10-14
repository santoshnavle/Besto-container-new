import React, { useState, useEffect } from 'react';
import { BlogPost, PageView } from '../types';
import { getBlogPostBySlug, getPublishedBlogPosts } from '../services/blogService';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Send,
  Building2,
  PhoneCall,
} from 'lucide-react';
import DOMPurify, { Config } from 'dompurify';

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

interface BlogPostDetailPageProps {
  slug: string;
  onNavigateBack: () => void;
  onSelectPost: (slug: string) => void;
  onNavigate: (page: PageView) => void;
  onRequestQuote: () => void;
}

export const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({
  slug,
  onNavigateBack,
  onSelectPost,
  onNavigate,
  onRequestQuote,
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      try {
        setLoading(true);
        const fetchedPost = await getBlogPostBySlug(slug);
        if (isMounted) {
          setPost(fetchedPost);

          if (fetchedPost) {
            // Update SEO Metadata Dynamically
            document.title = fetchedPost.seoTitle || `${fetchedPost.title} | Besto Container Industries`;
            
            // Meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', fetchedPost.seoDescription || fetchedPost.excerpt);

            // Open Graph tags
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
              ogTitle = document.createElement('meta');
              ogTitle.setAttribute('property', 'og:title');
              document.head.appendChild(ogTitle);
            }
            ogTitle.setAttribute('content', fetchedPost.title);

            let ogDesc = document.querySelector('meta[property="og:description"]');
            if (!ogDesc) {
              ogDesc = document.createElement('meta');
              ogDesc.setAttribute('property', 'og:description');
              document.head.appendChild(ogDesc);
            }
            ogDesc.setAttribute('content', fetchedPost.excerpt);

            let ogImg = document.querySelector('meta[property="og:image"]');
            if (!ogImg && fetchedPost.coverImageUrl) {
              ogImg = document.createElement('meta');
              ogImg.setAttribute('property', 'og:image');
              document.head.appendChild(ogImg);
            }
            if (ogImg && fetchedPost.coverImageUrl) {
              ogImg.setAttribute('content', fetchedPost.coverImageUrl);
            }

            // Fetch related posts from same category or general
            const allPosts = await getPublishedBlogPosts();
            const related = allPosts
              .filter((p) => p.slug !== slug && (p.category === fetchedPost.category || true))
              .slice(0, 3);
            if (isMounted) setRelatedPosts(related);
          }
        }
      } catch (err) {
        console.error('Failed to load blog post:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-6">
          <div className="h-5 bg-slate-200 rounded w-24" />
          <div className="h-10 bg-slate-200 rounded w-3/4" />
          <div className="h-6 bg-slate-200 rounded w-1/2" />
          <div className="aspect-video bg-slate-200 rounded-2xl" />
          <div className="h-40 bg-slate-100 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The requested industrial article could not be located, or it might have been placed in draft mode.
          </p>
          <button
            onClick={onNavigateBack}
            className="px-5 py-2.5 bg-[#F15A24] text-white text-xs font-bold rounded-xl hover:bg-[#D94814] transition-colors cursor-pointer"
          >
            RETURN TO BLOG DIRECTORY
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 sticky top-22 sm:top-24 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#F15A24] transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>BACK TO ALL ARTICLES</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Share article URL"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Header Metadata */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F15A24] mb-3">
            <span className="px-3 py-1 bg-orange-100 rounded-md">{post.category}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              <span className="font-semibold text-slate-700">{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#F7941D]" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Verified Technical Content</span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        {post.coverImageUrl && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-slate-200/90 shadow-md max-h-[460px] bg-slate-900">
            <img
              src={post.coverImageUrl}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        )}

        {/* Executive Excerpt */}
        {post.excerpt && (
          <div className="p-5 sm:p-6 bg-white border-l-4 border-[#F15A24] rounded-r-2xl shadow-xs mb-10 text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
            {post.excerpt}
          </div>
        )}

        {/* Article Body safely sanitized */}
        <div
          className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs prose prose-slate max-w-none 
          prose-headings:font-bold prose-headings:text-slate-900 
          prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-[17px]
          prose-li:text-slate-700 prose-li:text-base sm:prose-li:text-[17px]
          prose-strong:text-slate-900
          prose-a:text-[#F15A24] prose-a:underline hover:prose-a:text-[#D94814]
          prose-blockquote:border-l-4 prose-blockquote:border-[#F15A24] prose-blockquote:bg-orange-50/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
          prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:max-h-[500px] prose-img:object-cover
          prose-figure:my-6 prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-slate-500 prose-figcaption:mt-2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content, SANITIZE_CONFIG),
          }}
        />

        {/* Tags bar */}
        {post.tags && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Tag size={13} />
              <span>Related Keywords:</span>
            </span>
            {post.tags.split(',').map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-600 font-medium"
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Industrial Buyer Commercial In-Article Callout */}
        <div className="mt-12 bg-linear-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/20 text-[#F7941D] rounded text-xs font-bold uppercase tracking-wider">
              <Building2 size={13} />
              <span>Palghar Facility Technical Desk</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Sourcing Industrial Packaging for Your Plant?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Besto Container Industries manufactures brand-new M.S. and G.I. barrels and reconditions UN-certified steel and HDPE barrels under full ZLD compliance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onRequestQuote}
              className="px-5 py-3 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Send size={14} />
              <span>REQUEST A QUOTE</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <PhoneCall size={14} className="text-[#F7941D]" />
              <span>TALK TO SALES</span>
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Related Industrial Articles
              </h3>
              <button
                onClick={onNavigateBack}
                className="text-xs font-bold text-[#F15A24] hover:text-[#D94814] flex items-center gap-1 cursor-pointer"
              >
                <span>VIEW ALL ARTICLES</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectPost(rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-orange-200 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-100 mb-3">
                      <img
                        src={rel.coverImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F15A24] mb-1 block">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#F15A24] transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#F15A24] flex items-center gap-1 pt-2 border-t border-slate-100 mt-2">
                    <span>Read Guide</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
