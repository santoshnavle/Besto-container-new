import React, { useState, useEffect, useMemo } from 'react';
import { BlogPost, BlogCategory, PageView } from '../types';
import {
  getPublishedBlogPosts,
  getBlogCategories,
  seedInitialBlogDataIfEmpty,
} from '../services/blogService';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Filter,
  Layers,
  ChevronLeft,
  ChevronRight,
  Tag,
  Clock,
  Sparkles,
} from 'lucide-react';

interface BlogPageProps {
  onSelectPost: (slug: string) => void;
  onNavigate: (page: PageView) => void;
}

const POSTS_PER_PAGE = 6;

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectPost, onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Load articles from real Firestore
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        // Automatically check if Firestore collection is fresh and seed initial posts if empty
        await seedInitialBlogDataIfEmpty();
        
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getPublishedBlogPosts(),
          getBlogCategories(),
        ]);

        if (isMounted) {
          setPosts(fetchedPosts);
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error('Error fetching blog articles:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Must be published (double check)
      if (post.status !== 'published') return false;

      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.tags?.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white relative overflow-hidden py-16 sm:py-20 border-b-4 border-[#F15A24]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(241,90,36,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase text-[#F7941D] mb-4 backdrop-blur-xs">
              <BookOpen size={14} />
              <span>INDUSTRY KNOWLEDGE & TECHNICAL GUIDES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Industrial Packaging Insights
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Authoritative technical engineering articles, reconditioning quality standards, Zero Liquid Discharge (ZLD) environmental practices, and UN chemical packaging regulations from Besto Container Industries.
            </p>
          </div>
        </div>
      </section>

      {/* Control Bar: Search & Category Filter */}
      <section className="sticky top-22 sm:top-24 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Articles ({posts.length})
              </button>
              {categories.map((cat) => {
                const count = posts.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'bg-[#F15A24] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles, UN codes, drums..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-video bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-14 bg-slate-100 rounded" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <Layers size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
            <p className="text-xs text-slate-500 mb-6">
              {searchQuery
                ? `No articles matched your search query "${searchQuery}".`
                : `No published articles available in category "${selectedCategory}".`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#F15A24] text-white text-xs font-bold rounded-lg hover:bg-[#D94814] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Cover Image with aspect ratio */}
                  <div
                    onClick={() => onSelectPost(post.slug)}
                    className="aspect-16/10 relative overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={post.coverImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold rounded-md shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta information */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[#F7941D]" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author || 'Besto Desk'}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        onClick={() => onSelectPost(post.slug)}
                        className="text-lg font-bold text-slate-900 group-hover:text-[#F15A24] transition-colors leading-snug line-clamp-2 mb-2.5 cursor-pointer"
                      >
                        {post.title}
                      </h2>

                      {/* Short Excerpt */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom CTA & Tags */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <button
                        onClick={() => onSelectPost(post.slug)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F15A24] hover:text-[#D94814] transition-colors cursor-pointer"
                      >
                        <span>READ MORE</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <span className="text-[11px] text-slate-400 font-mono">
                        ~4 min read
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                        currentPage === pNum
                          ? 'bg-[#F15A24] text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Industrial Packaging Consultation Footer Callout */}
      <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-1">
              Have questions regarding chemical packaging regulations or barrel specs?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our packaging engineering specialists in Palghar assist procurement teams with UN compliance, custom epoxy linings, and ZLD audit documentation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            TALK TO AN ENGINEER
          </button>
        </div>
      </section>
    </div>
  );
};
