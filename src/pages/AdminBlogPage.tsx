import React, { useState, useEffect } from 'react';
import { BlogPost, BlogCategory, PageView } from '../types';
import {
  getAllBlogPostsForAdmin,
  getBlogCategories,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  generateSlug,
  seedInitialBlogDataIfEmpty,
} from '../services/blogService';
import { BlogEditor } from '../components/BlogEditor';
import { auth } from '../lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Lock,
  LogOut,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Trash2,
  Edit2,
  Eye,
  Search,
  Tag,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  FolderPlus,
  ArrowRight,
  ExternalLink,
  Layers,
  ArrowLeft,
  Info,
  Calendar,
} from 'lucide-react';

interface AdminBlogPageProps {
  onNavigate: (page: PageView) => void;
  onViewLivePost: (slug: string) => void;
}

export const AdminBlogPage: React.FC<AdminBlogPageProps> = ({
  onNavigate,
  onViewLivePost,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Active Tab: 'articles' or 'categories'
  const [adminTab, setAdminTab] = useState<'articles' | 'categories'>('articles');

  // Editor states
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Add Category modal state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isNewCatSlugManual, setIsNewCatSlugManual] = useState(false);
  const [catFormSubmitting, setCatFormSubmitting] = useState(false);

  // Edit Category modal state
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatSlug, setEditCatSlug] = useState('');
  const [editCatDesc, setEditCatDesc] = useState('');
  const [isEditCatSlugManual, setIsEditCatSlugManual] = useState(false);
  const [editCatSubmitting, setEditCatSubmitting] = useState(false);

  // Delete Category modal state
  const [deleteTargetCat, setDeleteTargetCat] = useState<BlogCategory | null>(null);
  const [reassignCategoryName, setReassignCategoryName] = useState<string>('');
  const [isDeletingCat, setIsDeletingCat] = useState(false);

  // Filters & search for articles
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Category search filter
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Delete Article modal state
  const [deleteTargetPost, setDeleteTargetPost] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Message notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch posts and categories once user is logged in
  const loadAdminData = async () => {
    try {
      setLoadingPosts(true);
      const [fetchedPosts, fetchedCats] = await Promise.all([
        getAllBlogPostsForAdmin(),
        getBlogCategories(),
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCats);
    } catch (err: any) {
      console.error('Error loading admin posts:', err);
      showNotification('error', err?.message || 'Failed to load posts from database.');
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAdminData();
    }
  }, [currentUser]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setAuthError(err?.message || 'Failed to sign in with Google account.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsEditing(false);
      setEditingPost(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  // Save (Create or Update) Blog Post
  const handleSavePost = async (postData: Omit<BlogPost, 'id'>, postId?: string) => {
    try {
      if (postId) {
        await updateBlogPost(postId, postData);
        showNotification('success', 'Article updated successfully in Firestore.');
      } else {
        await createBlogPost(postData);
        showNotification('success', 'New article created and saved to Firestore.');
      }
      setIsEditing(false);
      setEditingPost(null);
      await loadAdminData();
    } catch (err: any) {
      throw err;
    }
  };

  // Toggle publish / unpublish status
  const handleToggleStatus = async (post: BlogPost) => {
    try {
      const nextStatus = post.status === 'published' ? 'draft' : 'published';
      await updateBlogPost(post.id, {
        status: nextStatus,
        publishedAt: nextStatus === 'published' ? (post.publishedAt || new Date().toISOString()) : undefined,
      });
      showNotification(
        'success',
        `Article ${nextStatus === 'published' ? 'published publicly' : 'converted to draft'}.`
      );
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to update article status.');
    }
  };

  // Confirm delete blog post
  const handleConfirmDelete = async () => {
    if (!deleteTargetPost) return;
    try {
      setIsDeleting(true);
      await deleteBlogPost(deleteTargetPost.id);
      showNotification('success', `Deleted article "${deleteTargetPost.title}".`);
      setDeleteTargetPost(null);
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to delete post.');
    } finally {
      setIsDeleting(false);
    }
  };

  // ----------------------------------------------------
  // Category Handlers
  // ----------------------------------------------------

  const handleOpenAddCategory = () => {
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
    setIsNewCatSlugManual(false);
    setIsAddingCategory(true);
  };

  const handleNewCatNameChange = (val: string) => {
    setNewCatName(val);
    if (!isNewCatSlugManual) {
      setNewCatSlug(generateSlug(val));
    }
  };

  const handleNewCatSlugChange = (val: string) => {
    setIsNewCatSlugManual(true);
    setNewCatSlug(generateSlug(val));
  };

  const handleAddCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showNotification('error', 'Category name is required.');
      return;
    }
    const slugToUse = newCatSlug.trim() || generateSlug(newCatName);
    if (!slugToUse) {
      showNotification('error', 'A valid category slug is required.');
      return;
    }

    try {
      setCatFormSubmitting(true);
      await createBlogCategory({
        name: newCatName.trim(),
        slug: slugToUse,
        description: newCatDesc.trim(),
      });
      setIsAddingCategory(false);
      showNotification('success', `Category "${newCatName.trim()}" created successfully in Firestore.`);
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to add category.');
    } finally {
      setCatFormSubmitting(false);
    }
  };

  const handleOpenEditCategory = (cat: BlogCategory) => {
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditCatSlug(cat.slug);
    setEditCatDesc(cat.description || '');
    setIsEditCatSlugManual(true);
  };

  const handleEditCatNameChange = (val: string) => {
    setEditCatName(val);
    if (!isEditCatSlugManual) {
      setEditCatSlug(generateSlug(val));
    }
  };

  const handleEditCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    if (!editCatName.trim()) {
      showNotification('error', 'Category name is required.');
      return;
    }
    const slugToUse = editCatSlug.trim() || generateSlug(editCatName);

    try {
      setEditCatSubmitting(true);
      const result = await updateBlogCategory(
        editingCategory.id,
        {
          name: editCatName.trim(),
          slug: slugToUse,
          description: editCatDesc.trim(),
        },
        editingCategory.name
      );

      setEditingCategory(null);
      if (result.updatedPostsCount > 0) {
        showNotification(
          'success',
          `Category updated. Re-linked ${result.updatedPostsCount} existing blog articles to "${editCatName.trim()}".`
        );
      } else {
        showNotification('success', `Category "${editCatName.trim()}" updated successfully.`);
      }
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to update category.');
    } finally {
      setEditCatSubmitting(false);
    }
  };

  const handleOpenDeleteCategory = (cat: BlogCategory) => {
    setDeleteTargetCat(cat);
    // Find first other available category as default reassignment
    const otherCats = categories.filter((c) => c.id !== cat.id);
    if (otherCats.length > 0) {
      setReassignCategoryName(otherCats[0].name);
    } else {
      setReassignCategoryName('General Industrial');
    }
  };

  const handleConfirmDeleteCategory = async () => {
    if (!deleteTargetCat) return;
    try {
      setIsDeletingCat(true);
      const result = await deleteBlogCategory(
        deleteTargetCat.id,
        deleteTargetCat.name,
        reassignCategoryName
      );
      showNotification(
        'success',
        `Category "${deleteTargetCat.name}" deleted. ${
          result.reassignedPostsCount > 0
            ? `${result.reassignedPostsCount} assigned articles safely reassigned to "${reassignCategoryName}".`
            : 'No articles affected.'
        }`
      );
      setDeleteTargetCat(null);
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', err?.message || 'Failed to delete category.');
    } finally {
      setIsDeletingCat(false);
    }
  };

  // Seed standard posts if needed
  const handleSeedData = async () => {
    if (!window.confirm('Populate Firestore with Besto Container industrial articles and standard categories?')) {
      return;
    }
    try {
      setLoadingPosts(true);
      await seedInitialBlogDataIfEmpty();
      showNotification('success', 'Database seeded with industry articles & categories.');
      await loadAdminData();
    } catch (err: any) {
      showNotification('error', 'Seeding completed or already exists.');
    } finally {
      setLoadingPosts(false);
    }
  };

  // Metrics
  const totalCount = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  // Filtered post list
  const filteredPosts = posts.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Filtered categories
  const filteredCategories = categories.filter((c) => {
    const q = categorySearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q))
    );
  });

  // Check duplicate in add modal
  const isDuplicateAddName =
    newCatName.trim() !== '' &&
    categories.some((c) => c.name.toLowerCase() === newCatName.trim().toLowerCase());
  const isDuplicateAddSlug =
    newCatSlug.trim() !== '' &&
    categories.some((c) => c.slug.toLowerCase() === newCatSlug.trim().toLowerCase());

  // Check duplicate in edit modal
  const isDuplicateEditName = Boolean(
    editingCategory &&
    editCatName.trim() !== '' &&
    categories.some(
      (c) => c.id !== editingCategory.id && c.name.toLowerCase() === editCatName.trim().toLowerCase()
    )
  );
  const isDuplicateEditSlug = Boolean(
    editingCategory &&
    editCatSlug.trim() !== '' &&
    categories.some(
      (c) => c.id !== editingCategory.id && c.slug.toLowerCase() === editCatSlug.trim().toLowerCase()
    )
  );

  // 1. Unauthenticated Login Screen
  if (!currentUser && !authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 text-center">
          <div className="w-14 h-14 bg-orange-100 text-[#F15A24] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Besto Admin Portal
          </h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Secure administrative control panel for Besto Container Industries Blog & Technical Knowledge Management.
          </p>

          {authError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs text-left">
              <strong>Login Notice:</strong> {authError}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google Account</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Return to Besto Homepage
            </button>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Authorized Administrator Access Only</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white space-y-3">
          <RefreshCw size={28} className="animate-spin mx-auto text-[#F15A24]" />
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  // 3. Editor View
  if (isEditing) {
    return (
      <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BlogEditor
            initialPost={editingPost}
            categories={categories}
            onSave={handleSavePost}
            onCancel={() => {
              setIsEditing(false);
              setEditingPost(null);
            }}
          />
        </div>
      </div>
    );
  }

  // 4. Authenticated Admin Dashboard Main View
  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">
      {/* Admin Header with high-contrast text */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F15A24] rounded-xl flex items-center justify-center font-black text-white text-base shadow-xs">
              B
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
                Besto Blog Management System
              </h1>
              <p className="text-[11px] text-slate-300 font-medium">
                Connected to Cloud Firestore · Palghar Facility
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/90 py-1.5 px-3 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-200 font-mono">
                {currentUser?.email || 'Admin'}
              </span>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700/60"
              title="Open Public Blog"
            >
              <span className="hidden xs:inline">View Public Blog</span>
              <ExternalLink size={13} />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 bg-red-950/70 hover:bg-red-900 text-red-200 hover:text-white rounded-lg text-xs transition-colors cursor-pointer border border-red-800/50"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Clearly Visible Admin Navigation Tabs */}
      <nav className="bg-slate-800 border-b border-slate-700/90 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <button
            onClick={() => setAdminTab('articles')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              adminTab === 'articles'
                ? 'border-[#F15A24] text-white bg-slate-900/60'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileText size={16} />
            <span>Manage Articles</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                adminTab === 'articles'
                  ? 'bg-[#F15A24] text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab('categories')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              adminTab === 'categories'
                ? 'border-[#F15A24] text-white bg-slate-900/60'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Tag size={16} />
            <span>Manage Categories</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                adminTab === 'categories'
                  ? 'bg-[#F15A24] text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {categories.length}
            </span>
          </button>
        </div>
      </nav>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 transition-all">
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-xs ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600 font-bold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setAdminTab('articles')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
              adminTab === 'articles'
                ? 'bg-white border-[#F15A24] ring-2 ring-orange-100'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Articles</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{totalCount}</p>
              </div>
              <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
                <FileText size={20} />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
              <span>View articles list</span>
              <ArrowRight size={12} />
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Published</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{publishedCount}</p>
            </div>
            <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Drafts</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{draftCount}</p>
            </div>
            <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>

          <div
            onClick={() => setAdminTab('categories')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
              adminTab === 'categories'
                ? 'bg-white border-[#F15A24] ring-2 ring-orange-100'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#F15A24] uppercase tracking-wider">Categories</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{categories.length}</p>
              </div>
              <div className="w-11 h-11 bg-orange-50 text-[#F15A24] rounded-xl flex items-center justify-center">
                <Tag size={20} />
              </div>
            </div>
            <p className="text-[11px] text-[#F15A24] mt-3 font-semibold flex items-center gap-1">
              <span>Manage all categories</span>
              <ArrowRight size={12} />
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: MANAGE ARTICLES                              */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'articles' && (
          <div className="space-y-6">
            {/* Action & Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2.5 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Create New Article</span>
                </button>

                <button
                  onClick={() => setAdminTab('categories')}
                  className="px-3.5 py-2.5 bg-orange-50 hover:bg-orange-100 text-[#F15A24] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-orange-200"
                >
                  <Tag size={15} />
                  <span>Manage Categories ({categories.length})</span>
                </button>

                <button
                  onClick={handleSeedData}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Populate recommended articles & categories if empty"
                >
                  <RefreshCw size={13} />
                  <span>Sync Defaults</span>
                </button>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-[#F15A24]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-[#F15A24]"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-[#F15A24]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id || c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Manage Articles ({filteredPosts.length})
                </h2>
                <button
                  onClick={loadAdminData}
                  className="text-xs text-slate-500 hover:text-[#F15A24] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RefreshCw size={13} className={loadingPosts ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingPosts ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <RefreshCw size={24} className="animate-spin mx-auto text-[#F15A24]" />
                  <p className="text-xs">Loading articles from Firestore...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <FileText size={36} className="mx-auto text-slate-300" />
                  <p className="text-sm font-semibold">No articles match your criteria</p>
                  <p className="text-xs text-slate-400">
                    Click "Create New Article" above to publish your first post.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-6">Article</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              {post.coverImageUrl ? (
                                <img
                                  src={post.coverImageUrl}
                                  alt={post.title}
                                  className="w-12 h-10 object-cover rounded-lg shrink-0 border border-slate-200"
                                />
                              ) : (
                                <div className="w-12 h-10 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-400">
                                  <FileText size={16} />
                                </div>
                              )}
                              <div className="min-w-0 max-w-sm">
                                <p className="font-bold text-slate-900 truncate">{post.title}</p>
                                <p className="text-[11px] text-slate-400 font-mono truncate">
                                  /{post.slug}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                              {post.category}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleStatus(post)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                                post.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              }`}
                              title="Click to toggle status"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  post.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                              />
                              <span>{post.status}</span>
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {post.author || 'Besto Desk'}
                          </td>

                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {new Date(post.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>

                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {post.status === 'published' && (
                                <button
                                  onClick={() => onViewLivePost(post.slug)}
                                  className="p-1.5 text-slate-500 hover:text-[#F15A24] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                                  title="View published article"
                                >
                                  <Eye size={15} />
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setEditingPost(post);
                                  setIsEditing(true);
                                }}
                                className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit article"
                              >
                                <Edit2 size={15} />
                              </button>

                              <button
                                onClick={() => setDeleteTargetPost(post)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete article"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: MANAGE CATEGORIES                            */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'categories' && (
          <div className="space-y-6">
            {/* Categories Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="text-[#F15A24]" size={20} />
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Blog Category Management
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Create, edit, and organize persistent categories stored in Cloud Firestore.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAddCategory}
                  className="px-4 py-2.5 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Add New Category</span>
                </button>

                <div className="relative min-w-[220px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-[#F15A24]"
                  />
                </div>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    All Categories ({filteredCategories.length})
                  </span>
                  <span className="text-[11px] text-slate-400">
                    · Synced with Cloud Firestore
                  </span>
                </div>
                <button
                  onClick={loadAdminData}
                  className="text-xs text-slate-500 hover:text-[#F15A24] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RefreshCw size={13} className={loadingPosts ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingPosts ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <RefreshCw size={24} className="animate-spin mx-auto text-[#F15A24]" />
                  <p className="text-xs">Loading categories from Firestore...</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <Tag size={36} className="mx-auto text-slate-300" />
                  <p className="text-sm font-semibold">No categories found</p>
                  <p className="text-xs text-slate-400">
                    Click "Add New Category" above to create your first category.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3.5 px-6">Category Details</th>
                        <th className="py-3.5 px-4">URL Slug</th>
                        <th className="py-3.5 px-4">Assigned Articles</th>
                        <th className="py-3.5 px-4">Created Date</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredCategories.map((cat) => {
                        const assignedPostsCount = posts.filter((p) => p.category === cat.name).length;
                        return (
                          <tr key={cat.id || cat.slug} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="space-y-0.5">
                                <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                  <span>{cat.name}</span>
                                </p>
                                <p className="text-[11px] text-slate-500 max-w-md line-clamp-2">
                                  {cat.description || (
                                    <span className="italic text-slate-400">No description provided</span>
                                  )}
                                </p>
                              </div>
                            </td>

                            <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-md">
                                /{cat.slug}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  assignedPostsCount > 0
                                    ? 'bg-orange-50 text-[#F15A24] border border-orange-200'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                <span>{assignedPostsCount}</span>
                                <span>{assignedPostsCount === 1 ? 'article' : 'articles'}</span>
                              </span>
                            </td>

                            <td className="py-4 px-4 text-slate-500 text-[11px]">
                              {cat.createdAt ? (
                                new Date(cat.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              ) : (
                                <span className="text-slate-400">System default</span>
                              )}
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditCategory(cat)}
                                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Edit category"
                                >
                                  <Edit2 size={15} />
                                </button>

                                <button
                                  onClick={() => handleOpenDeleteCategory(cat)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete category"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Modal: Delete Article Confirmation */}
      {deleteTargetPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Confirm Article Deletion
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900">"{deleteTargetPost.title}"</strong>? This will remove the article from Cloud Firestore and the public website immediately.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTargetPost(null)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Category */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F15A24] flex items-center justify-center">
                  <Tag size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
                  <p className="text-[11px] text-slate-500">Saved persistently to Cloud Firestore</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => handleNewCatNameChange(e.target.value)}
                  placeholder="e.g. Hazardous Materials Handling"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100"
                  required
                  maxLength={100}
                />
                {isDuplicateAddName && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>A category with this name already exists.</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL-friendly Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 focus-within:bg-white focus-within:border-[#F15A24] focus-within:ring-2 focus-within:ring-orange-100">
                  <span className="text-xs font-mono text-slate-400 select-none">/category/</span>
                  <input
                    type="text"
                    value={newCatSlug}
                    onChange={(e) => handleNewCatSlugChange(e.target.value)}
                    placeholder="hazardous-materials-handling"
                    className="w-full py-2 px-1 bg-transparent text-xs font-mono text-slate-800 outline-none"
                    required
                    maxLength={100}
                  />
                </div>
                {isDuplicateAddSlug && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>This URL slug is already taken.</span>
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-1">
                  Auto-generated from name. Letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Brief description for SEO and category guides..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100"
                />
                <span className="text-[10px] text-slate-400 float-right mt-0.5">
                  {newCatDesc.length}/500
                </span>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={catFormSubmitting || isDuplicateAddName || isDuplicateAddSlug}
                  className="flex-1 py-2.5 px-4 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {catFormSubmitting ? 'Saving...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Category */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Edit2 size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Category</h3>
                  <p className="text-[11px] text-slate-500">ID: {editingCategory.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editCatName}
                  onChange={(e) => handleEditCatNameChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100"
                  required
                  maxLength={100}
                />
                {isDuplicateEditName && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>Another category with this name already exists.</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL-friendly Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 focus-within:bg-white focus-within:border-[#F15A24]">
                  <span className="text-xs font-mono text-slate-400 select-none">/category/</span>
                  <input
                    type="text"
                    value={editCatSlug}
                    onChange={(e) => setEditCatSlug(generateSlug(e.target.value))}
                    className="w-full py-2 px-1 bg-transparent text-xs font-mono text-slate-800 outline-none"
                    required
                    maxLength={100}
                  />
                </div>
                {isDuplicateEditSlug && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>This URL slug is taken by another category.</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:border-[#F15A24]"
                />
                <span className="text-[10px] text-slate-400 float-right mt-0.5">
                  {editCatDesc.length}/500
                </span>
              </div>

              {/* Notice regarding assigned articles */}
              {(() => {
                const assignedCount = posts.filter((p) => p.category === editingCategory.name).length;
                if (assignedCount > 0 && editCatName.trim() !== editingCategory.name) {
                  return (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-[11px] flex items-start gap-2">
                      <Info size={15} className="shrink-0 mt-0.5 text-blue-600" />
                      <span>
                        Renaming will automatically update the category tag on <strong>{assignedCount}</strong> existing blog {assignedCount === 1 ? 'article' : 'articles'} in Firestore.
                      </span>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editCatSubmitting || isDuplicateEditName || isDuplicateEditSlug}
                  className="flex-1 py-2.5 px-4 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {editCatSubmitting ? 'Saving...' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Category Confirmation with Post-Safety Guarantee */}
      {deleteTargetCat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Delete Category: {deleteTargetCat.name}
            </h3>

            {(() => {
              const assigned = posts.filter((p) => p.category === deleteTargetCat.name);
              const otherCategories = categories.filter((c) => c.id !== deleteTargetCat.id);

              return (
                <div className="space-y-4 my-4">
                  {assigned.length > 0 ? (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-2">
                      <p className="font-bold flex items-center gap-1.5 text-amber-800">
                        <AlertTriangle size={15} />
                        <span>Warning: {assigned.length} {assigned.length === 1 ? 'article is' : 'articles are'} assigned to this category</span>
                      </p>
                      <p className="text-[11px] leading-relaxed text-amber-700">
                        To protect your blog content, <strong>articles are NEVER deleted</strong> when removing a category. Please choose where to safely reassign them:
                      </p>

                      <div className="pt-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Reassign assigned articles to:
                        </label>
                        <select
                          value={reassignCategoryName}
                          onChange={(e) => setReassignCategoryName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-[#F15A24]"
                        >
                          {otherCategories.map((c) => (
                            <option key={c.id || c.slug} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          <option value="General Industrial">General Industrial</option>
                        </select>
                      </div>

                      <div className="pt-1 text-[11px] text-slate-500">
                        <span className="font-semibold">Articles affected: </span>
                        {assigned.slice(0, 2).map((a) => a.title).join(', ')}
                        {assigned.length > 2 && ` and ${assigned.length - 2} more`}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                      No blog articles are currently using this category. Are you sure you want to permanently remove it from Firestore?
                    </p>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setDeleteTargetCat(null)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteCategory}
                disabled={isDeletingCat}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isDeletingCat ? 'Deleting...' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
