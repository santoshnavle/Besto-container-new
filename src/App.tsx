import React, { useState, useEffect } from 'react';
import { PageView, ProductItem } from './types';
import { PRODUCTS } from './data/products';
import { COMPANY_DETAILS } from './data/company';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NewPackagingPage } from './pages/NewPackagingPage';
import { FacilityPage } from './pages/FacilityPage';
import { AboutPage } from './pages/AboutPage';
import { LegacyServicesPage } from './pages/LegacyServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { AdminBlogPage } from './pages/AdminBlogPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { Phone, MessageSquare, Send } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('bestosia-otp');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState<ProductItem | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('');

  // Sync hash routing & handle legacy/SEO redirects
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      
      // SEO & Canonical Redirect: #refurbished, #bestosia, or #products routes directly to products page
      if (rawHash === 'refurbished' || rawHash === 'bestosia' || rawHash === 'products') {
        setCurrentPage('new-packaging');
        document.title = 'Industrial Packaging Solutions — Drums, Barrels & IBCs | Besto Container Industries';
        setTimeout(() => {
          const el = document.getElementById('bestosia');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
        return;
      }

      if (rawHash.startsWith('product/')) {
        const prodId = rawHash.replace('product/', '');
        const found = PRODUCTS.find(p => p.id === prodId);
        if (found) {
          setSelectedProductId(prodId);
          setCurrentPage('product-detail');
          document.title = `${found.name} — ${found.fullName} | Besto Container Industries`;
          return;
        }
      }

      if (rawHash === 'admin' || rawHash === '/admin') {
        setCurrentPage('admin');
        document.title = 'Admin Portal — Blog Management | Besto Container Industries';
        let robots = document.querySelector('meta[name="robots"]');
        if (!robots) {
          robots = document.createElement('meta');
          robots.setAttribute('name', 'robots');
          document.head.appendChild(robots);
        }
        robots.setAttribute('content', 'noindex, nofollow');
        return;
      }

      // Ensure public pages have regular indexing
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'index, follow');
      }

      if (rawHash.startsWith('blog/')) {
        const blogSlug = rawHash.replace('blog/', '');
        setSelectedBlogSlug(blogSlug);
        setCurrentPage('blog-detail');
        return;
      }

      const validPages: PageView[] = [
        'home', 
        'products',
        'new-packaging', 
        'facility', 
        'about', 
        'legacy-services', 
        'blog',
        'blog-detail',
        'admin',
        'contact'
      ];

      if (validPages.includes(rawHash as PageView)) {
        setCurrentPage(rawHash as PageView);
      } else if (!rawHash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Title for SEO & user orientation
    switch (page) {
      case 'products':
      case 'new-packaging':
        document.title = 'Industrial Packaging Solutions — Drums, Barrels & IBCs | Besto Container Industries';
        break;
      case 'facility':
        document.title = 'Processing Facility & ZLD Effluent Treatment | Besto Container Industries';
        break;
      case 'legacy-services':
        document.title = 'IBC Laundering & Mid-Capacity Drums | Besto Container Industries';
        break;
      case 'about':
        document.title = 'About Us | Besto Container Industries Palghar';
        break;
      case 'blog':
        document.title = 'Industrial Packaging Insights & Technical Guides | Besto Container Industries';
        break;
      case 'admin':
        document.title = 'Admin Portal — Blog Management | Besto Container Industries';
        break;
      case 'contact':
        document.title = 'Request a Quote & Contact | Besto Container Industries';
        break;
      default:
        document.title = 'Besto Container Industries | Industrial Barrels, Drums & IBC Solutions';
    }
  };

  const handleOpenBlogPost = (slug: string) => {
    setSelectedBlogSlug(slug);
    window.location.hash = `blog/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetailPage = (productId: string) => {
    setSelectedProductId(productId);
    window.location.hash = `product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetailModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenEnquiryModal = (product?: ProductItem) => {
    setEnquiryProduct(product || null);
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#F15A24] selection:text-white pb-14 md:pb-0">
      {/* Top Bar adhering to strict Top Bar Contract */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestQuoteClick={() => handleOpenEnquiryModal()}
        onSelectProduct={handleOpenProductDetailPage}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onEnquire={(prod) => handleOpenEnquiryModal(prod)}
            onViewDetails={(prod) => handleOpenProductDetailPage(prod.id)}
            onRequestQuote={() => handleOpenEnquiryModal()}
          />
        )}

        {(currentPage === 'new-packaging' || currentPage === 'products') && (
          <NewPackagingPage
            onEnquire={(prod) => handleOpenEnquiryModal(prod)}
            onViewDetails={(prod) => handleOpenProductDetailPage(prod.id)}
            onRequestQuote={() => handleOpenEnquiryModal()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'facility' && (
          <FacilityPage
            onRequestQuote={() => handleOpenEnquiryModal()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'legacy-services' && (
          <LegacyServicesPage
            onEnquire={(prod) => handleOpenEnquiryModal(prod)}
            onViewDetails={(prod) => handleOpenProductDetailPage(prod.id)}
            onRequestQuote={() => handleOpenEnquiryModal()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onRequestQuote={() => handleOpenEnquiryModal()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigateBack={() => {
              handleNavigate('new-packaging');
            }}
            onSelectProduct={handleOpenProductDetailPage}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onSelectPost={handleOpenBlogPost}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'blog-detail' && (
          <BlogPostDetailPage
            slug={selectedBlogSlug}
            onNavigateBack={() => handleNavigate('blog')}
            onSelectPost={handleOpenBlogPost}
            onNavigate={handleNavigate}
            onRequestQuote={() => handleOpenEnquiryModal()}
          />
        )}

        {currentPage === 'admin' && (
          <AdminBlogPage
            onNavigate={handleNavigate}
            onViewLivePost={handleOpenBlogPost}
          />
        )}
      </main>

      {/* Authoritative, quiet B2B Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onSelectProduct={handleOpenProductDetailPage}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-md border-t border-zinc-800 p-2 flex items-center justify-around gap-2 text-white shadow-lg">
        <a
          href={`tel:${COMPANY_DETAILS.contact.phone}`}
          className="flex-1 py-2 px-1 text-center bg-zinc-800 hover:bg-zinc-700 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone size={13} className="text-[#F7941D]" />
          <span>Call Desk</span>
        </a>
        <a
          href={COMPANY_DETAILS.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-1 text-center bg-emerald-700 hover:bg-emerald-600 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare size={13} />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => handleOpenEnquiryModal()}
          className="flex-1 py-2 px-1 text-center bg-[#F15A24] hover:bg-[#D94814] text-white rounded text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <Send size={13} />
          <span>Get Quote</span>
        </button>
      </div>

      {/* Modal: Detailed Technical Specs (accessible from card Specs click if needed) */}
      {isDetailModalOpen && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseDetailModal}
          onEnquire={(prod) => {
            handleCloseDetailModal();
            handleOpenEnquiryModal(prod);
          }}
        />
      )}

      {/* Modal: Commercial Quotation with Pre-selected Product */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          product={enquiryProduct}
          onClose={handleCloseEnquiryModal}
        />
      )}
    </div>
  );
}
