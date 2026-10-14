import React, { useState } from 'react';
import { PageView, ProductItem } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuoteForm } from '../components/QuoteForm';
import { ArrowRight, ChevronRight, Home, ShieldCheck, Layers, Box, Sparkles } from 'lucide-react';

interface NewPackagingPageProps {
  onEnquire: (product: ProductItem) => void;
  onViewDetails: (product: ProductItem) => void;
  onRequestQuote: () => void;
  onNavigate?: (page: PageView) => void;
}

export const NewPackagingPage: React.FC<NewPackagingPageProps> = ({
  onEnquire,
  onViewDetails,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'refurbished' | 'new' | 'legacy'>('all');
  const [bestosiaSubFilter, setBestosiaSubFilter] = useState<string>('all');

  const bestosiaProducts = PRODUCTS.filter(p => p.category === 'refurbished');
  const filteredBestosia = bestosiaSubFilter === 'all'
    ? bestosiaProducts
    : bestosiaProducts.filter(p => p.subCategory?.toLowerCase().includes(bestosiaSubFilter.toLowerCase()));

  const newProducts = PRODUCTS.filter(p => p.category === 'new');
  const legacyProducts = PRODUCTS.filter(p => p.category === 'legacy');

  return (
    <div className="space-y-16 pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-[#F15A24] transition-colors flex items-center gap-1 cursor-pointer py-1"
          >
            <Home size={15} />
            <span>HOME</span>
          </button>
          
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          
          <span className="text-slate-900 font-bold uppercase tracking-wider" aria-current="page">
            PRODUCTS
          </span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-[#121212] text-white py-16 lg:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
            <span>Complete Industrial Packaging Lineup</span>
            <span aria-hidden="true">·</span>
            <span>Refurbished BESTOSIA® & Brand-New</span>
            <span aria-hidden="true">·</span>
            <span>Palghar, Maharashtra</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl" style={{ textWrap: 'balance' }}>
            Industrial Barrels, Drums & Intermediate Bulk Containers
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Explore Besto Container Industries' complete container catalogue — certified reconditioned <strong className="text-white font-bold">BESTOSIA®</strong> steel barrels, HDPE drums, and 1000L IBCs, alongside factory-new packaging solutions manufactured to stringent industrial standards.
          </p>

          {/* Quick Category Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#F15A24] text-white shadow-sm'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-700'
              }`}
            >
              All Products ({PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('refurbished')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTab === 'refurbished'
                  ? 'bg-[#F15A24] text-white shadow-sm'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-700'
              }`}
            >
              BESTOSIA® Refurbished (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#F15A24] text-white shadow-sm'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-700'
              }`}
            >
              Brand-New Packaging (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('legacy')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTab === 'legacy'
                  ? 'bg-[#F15A24] text-white shadow-sm'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-700'
              }`}
            >
              Specialty & Services (4)
            </button>
          </div>
        </div>
      </section>

      {/* 2. BESTOSIA® REFURBISHED PACKAGING CATALOGUE (ALL 7 MODELS) */}
      {(activeTab === 'all' || activeTab === 'refurbished') && (
        <section id="bestosia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
                <ShieldCheck size={16} />
                <span>Certified Circular Economy Packaging</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] mt-1">
                BESTOSIA® Refurbished Product Catalogue (7 Specialized Models)
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed max-w-2xl">
                Rigorous hydraulic de-denting, multi-stage hot-water chemical decontamination linked to our on-site ETP, and 100% pneumatic pressure decay leak testing.
              </p>
            </div>

            {/* Sub-Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-lg self-start md:self-auto">
              <button
                type="button"
                onClick={() => setBestosiaSubFilter('all')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  bestosiaSubFilter === 'all' ? 'bg-[#F15A24] text-white shadow-2xs' : 'text-slate-700 hover:text-[#121212]'
                }`}
              >
                All (7)
              </button>
              <button
                type="button"
                onClick={() => setBestosiaSubFilter('steel')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  bestosiaSubFilter === 'steel' ? 'bg-[#F15A24] text-white shadow-2xs' : 'text-slate-700 hover:text-[#121212]'
                }`}
              >
                Steel Drums (4)
              </button>
              <button
                type="button"
                onClick={() => setBestosiaSubFilter('plastic')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  bestosiaSubFilter === 'plastic' ? 'bg-[#F15A24] text-white shadow-2xs' : 'text-slate-700 hover:text-[#121212]'
                }`}
              >
                HDPEC (1)
              </button>
              <button
                type="button"
                onClick={() => setBestosiaSubFilter('ibc')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  bestosiaSubFilter === 'ibc' ? 'bg-[#F15A24] text-white shadow-2xs' : 'text-slate-700 hover:text-[#121212]'
                }`}
              >
                IBCs (2)
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBestosia.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={onEnquire}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. BRAND-NEW PACKAGING CATALOGUE (3 CORE OFFERINGS) */}
      {(activeTab === 'all' || activeTab === 'new') && (
        <section id="new-containers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
          <div className="max-w-3xl space-y-2 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
              <Layers size={16} />
              <span>Virgin Manufacturing Partners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212]">
              Brand-New Barrels, Drums & Bulk Containers (3 Models)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Manufactured from prime cold-rolled steel, high-purity zinc coatings, and virgin high-density polyethylene for sensitive applications:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={onEnquire}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. SPECIALTY CONTAINERS & LAUNDERING SERVICES */}
      {(activeTab === 'all' || activeTab === 'legacy') && (
        <section className="bg-slate-50 border-y border-slate-200 py-16 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
                <Box size={16} />
                <span>Specialty Containers & Sizes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212]">
                Mid-Capacity Carboys, Plastic Drums & IBC Laundering
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Complementing 210L barrels, we supply reconditioned HDPE carboys (20L–50L), wide-mouth plastic drums, and turnkey customer-owned IBC laundering services:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legacyProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={onEnquire}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. STRATEGIC SOURCING BENEFITS */}
      <section id="strategic-benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
            Procurement Logic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
            Why Dual-Source with Besto Container Industries
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consolidating your container procurement under one supplier reduces vendor friction and simplifies logistics:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 border border-slate-200 rounded-xl space-y-3 hover:border-[#F15A24]/40 hover:shadow-md transition-all shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-sm text-[#F15A24]">
              01
            </div>
            <h3 className="text-base font-bold text-[#121212]">Single-Source Accountability</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Procure virgin containers for sensitive pharmaceutical APIs alongside refurbished BESTOSIA® barrels for general solvents under one trusted partner.
            </p>
          </div>

          <div className="bg-white p-7 border border-slate-200 rounded-xl space-y-3 hover:border-[#F15A24]/40 hover:shadow-md transition-all shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-sm text-[#F15A24]">
              02
            </div>
            <h3 className="text-base font-bold text-[#121212]">Cost-Optimized Blending</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Optimize procurement budgets by allocating reconditioned barrels where applicable without sacrificing brand-new quality for export cargo.
            </p>
          </div>

          <div className="bg-white p-7 border border-slate-200 rounded-xl space-y-3 hover:border-[#F15A24]/40 hover:shadow-md transition-all shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-sm text-[#F15A24]">
              03
            </div>
            <h3 className="text-base font-bold text-[#121212]">Simplified Logistics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Coordinate full truckload dispatches combining both new and refurbished units directly from our Palghar hub into your manufacturing facility.
            </p>
          </div>

          <div className="bg-white p-7 border border-slate-200 rounded-xl space-y-3 hover:border-[#F15A24]/40 hover:shadow-md transition-all shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-sm text-[#F15A24]">
              04
            </div>
            <h3 className="text-base font-bold text-[#121212]">Audited Compliance</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Both lines operate under the same corporate quality governance, backed by MPCB authorizations and an ISO Quality Management System.
            </p>
          </div>
        </div>
      </section>

      {/* 6. QUOTATION & SPECIFICATION REQUEST SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
              Commercial Quotation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#121212]">
              Request Container Specifications & Pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Please share your preferred dimensions, quantity and destination for factory-direct verified pricing and lead time.
            </p>
          </div>

          <QuoteForm initialCategory="all" />
        </div>
      </section>

    </div>
  );
};
