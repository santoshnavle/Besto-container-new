import React, { useState } from 'react';
import { PageView, ProductItem } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductVisual } from '../components/ProductVisual';
import { AdaptiveImage } from '../components/AdaptiveImage';
import { QuoteForm } from '../components/QuoteForm';
import { 
  Check, 
  ShieldCheck, 
  ArrowLeft, 
  Printer, 
  MessageSquare, 
  Share2, 
  ChevronRight,
  Camera,
  Compass,
  Home
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onNavigateBack: () => void;
  onSelectProduct: (productId: string) => void;
  onNavigate?: (page: PageView) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigateBack,
  onSelectProduct,
  onNavigate,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const relatedProducts = PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      onNavigateBack();
    }
  };

  const handleProductsClick = () => {
    if (onNavigate) {
      onNavigate('new-packaging');
    } else {
      onNavigateBack();
    }
  };

  const handleCategoryClick = () => {
    if (onNavigate) {
      if (product.category === 'legacy') {
        onNavigate('legacy-services');
      } else {
        onNavigate('new-packaging');
        if (product.category === 'refurbished') {
          setTimeout(() => {
            const el = document.getElementById('bestosia');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    } else {
      onNavigateBack();
    }
  };

  return (
    <div className="space-y-12 pb-24 pt-6">
      
      {/* Requirement 7: Breadcrumb Navigation - All parent items clickable with hand pointer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
          <button 
            type="button"
            onClick={handleHomeClick}
            className="hover:text-[#F15A24] transition-colors flex items-center gap-1 cursor-pointer py-1"
          >
            <Home size={15} />
            <span>HOME</span>
          </button>
          
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          
          <button 
            type="button"
            onClick={handleProductsClick}
            className="hover:text-[#F15A24] transition-colors uppercase tracking-wider cursor-pointer py-1"
          >
            PRODUCTS
          </button>
          
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          
          <button
            type="button"
            onClick={handleCategoryClick}
            className="hover:text-[#F15A24] transition-colors uppercase tracking-wider cursor-pointer py-1"
          >
            {product.category === 'refurbished' ? 'BESTOSIA® REFURBISHED' : product.category === 'new' ? 'BRAND-NEW PACKAGING' : 'LEGACY SERVICES'}
          </button>
          
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          
          {/* Final breadcrumb item: Current page, non-clickable */}
          <span className="text-slate-900 font-bold uppercase tracking-wider" aria-current="page">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Product Hero Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Card with View Toggle */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-6 sm:p-8 flex flex-col space-y-4">
            
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                CONTAINER VISUAL ASSET
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-md text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-[#F15A24] text-white shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Camera size={14} />
                  <span>Industrial Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('schematic')}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'schematic'
                      ? 'bg-[#F15A24] text-white shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Compass size={14} />
                  <span>Technical Schematic</span>
                </button>
              </div>
            </div>

            {/* Display Area */}
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
              {viewMode === 'photo' ? (
                <AdaptiveImage
                  imageKey={product.id}
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full h-80 sm:h-96 object-cover"
                  showCaption={true}
                />
              ) : (
                <div className="w-full h-80 sm:h-96 flex items-center justify-center p-4">
                  <ProductVisual id={product.id} className="w-full h-full max-w-sm" />
                </div>
              )}
            </div>
            
            <div className="w-full flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-200">
              <span className="font-mono text-xs text-slate-500">
                {viewMode === 'photo' ? 'Representative Industrial Photo' : 'Technical Vector Cross-Section'}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="hover:text-[#F15A24] flex items-center gap-1.5 transition-colors cursor-pointer text-slate-700 font-medium"
                  title="Copy Page Link"
                >
                  <Share2 size={15} />
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="hover:text-[#F15A24] flex items-center gap-1.5 transition-colors cursor-pointer text-slate-700 font-medium"
                  title="Print Specification Sheet"
                >
                  <Printer size={15} />
                  <span>Print Spec Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Fast Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono text-slate-600">
                <span className="uppercase text-[#F15A24] font-bold">{product.isBestosia ? 'BESTOSIA® Brand' : 'Industrial Packaging'}</span>
                <span aria-hidden="true">·</span>
                <span>{product.subCategory}</span>
                {product.tareWeight && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#121212] font-semibold">Tare: {product.tareWeight}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#121212] leading-tight">
                {product.name} — {product.fullName}
              </h1>

              {/* Requirement 2: Legible body text (16-18px) with 1.6-1.7 line height */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Key Attributes Grid */}
            <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <div>
                <span className="text-slate-500 block font-mono text-xs uppercase tracking-wider mb-0.5">Material Substrate</span>
                <span className="font-semibold text-[#121212]">{product.material}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-mono text-xs uppercase tracking-wider mb-0.5">Closure & Fitting</span>
                <span className="font-semibold text-[#121212]">{product.closureType || 'Standard Fitted'}</span>
              </div>
              <div className="col-span-2 pt-3 border-t border-slate-200">
                <span className="text-slate-500 block font-mono text-xs uppercase tracking-wider mb-0.5">Surface Protection</span>
                <span className="font-semibold text-[#121212]">{product.surfaceFinish || 'Cleaned & Conditioned'}</span>
              </div>
            </div>

            {/* Direct Quick Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#rfq-section"
                className="flex-1 py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md text-center transition-colors shadow-sm cursor-pointer"
              >
                Request Quotation for {product.name}
              </a>
              <a
                href={`https://wa.me/919833853196?text=${encodeURIComponent(`Hello Besto Container Industries, I am inquiring about technical specifications and price for ${product.name} (${product.fullName}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare size={17} />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* Compliance Badge */}
            <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-lg text-sm text-slate-800 flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#F15A24] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Processed under Maharashtra Pollution Control Board (MPCB) authorization and verified in compliance with an ISO-certified Quality Management System.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Detailed Technical Specifications Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            AUDIT CHECKLIST
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Technical Specifications & Material Integrity
          </h2>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm sm:text-base">
            <tbody className="divide-y divide-slate-200">
              {product.specs.map((spec, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                  <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-700 w-1/3">
                    {spec.label}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 font-mono text-slate-900">
                    {spec.value}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/50">
                <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-700">Pneumatic Leak Testing</td>
                <td className="py-3.5 px-5 sm:px-6 text-emerald-700 font-semibold">100% Tested under positive air pressure</td>
              </tr>
              <tr className="bg-white">
                <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-700">Environmental Treatment</td>
                <td className="py-3.5 px-5 sm:px-6 text-slate-900">Zero Liquid Discharge (ZLD) via on-site ETP</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-700">Regulatory Approval</td>
                <td className="py-3.5 px-5 sm:px-6 text-slate-900">Maharashtra Pollution Control Board (MPCB) consented</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Applications Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Recommended Industrial Media & Compatible Cargoes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {product.applications.map((app, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-lg space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Check size={16} className="text-emerald-600 shrink-0" />
                <span>Sector {idx + 1}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{app}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Quotation Section pre-locked to this product */}
      <section id="rfq-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              PROCUREMENT DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Request a Quotation for {product.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Please provide estimated quantity and required delivery location. Our sales team will confirm spot availability and freight estimates.
            </p>
          </div>

          <QuoteForm
            initialProductId={product.id}
            initialCategory={product.category}
          />
        </div>
      </section>

      {/* Related Products from Same Category */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Alternative Containers in this Category
            </h3>
            <button
              onClick={handleProductsClick}
              className="text-sm font-semibold text-slate-700 hover:text-[#F15A24] flex items-center gap-1 cursor-pointer"
            >
              <span>Back to all products</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel.id)}
                className="bg-white border border-slate-200 rounded-lg p-5 cursor-pointer hover:border-[#F15A24]/60 hover:shadow-md transition-all space-y-3"
              >
                <AdaptiveImage imageKey={rel.id} aspectRatioClass="aspect-[4/3]" className="w-full h-40 object-cover rounded" />
                <div>
                  <div className="text-xs font-mono text-slate-500">{rel.subCategory}</div>
                  <div className="text-base font-bold text-slate-900 mt-1">{rel.name}</div>
                  <div className="text-sm text-slate-600 line-clamp-1 mt-1">{rel.fullName}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
