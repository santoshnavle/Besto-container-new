import React from 'react';
import { PageView, ProductItem } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuoteForm } from '../components/QuoteForm';
import { 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Home
} from 'lucide-react';

interface LegacyServicesPageProps {
  onEnquire: (product: ProductItem) => void;
  onViewDetails: (product: ProductItem) => void;
  onRequestQuote: () => void;
  onNavigate?: (page: PageView) => void;
}

export const LegacyServicesPage: React.FC<LegacyServicesPageProps> = ({
  onEnquire,
  onViewDetails,
  onRequestQuote,
  onNavigate,
}) => {
  const legacyItems = PRODUCTS.filter(p => p.category === 'legacy');

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
          
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('new-packaging')}
            className="hover:text-[#F15A24] transition-colors uppercase tracking-wider cursor-pointer py-1"
          >
            PRODUCTS
          </button>
          
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          
          <span className="text-slate-900 font-bold uppercase tracking-wider" aria-current="page">
            LEGACY SERVICES & LAUNDERING
          </span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-[#121212] text-white py-16 lg:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
            <span>Specialized Industrial Services</span>
            <span aria-hidden="true">·</span>
            <span>IBC Laundering</span>
            <span aria-hidden="true">·</span>
            <span>30L–100L Plastic Drums & Carboys</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl" style={{ textWrap: 'balance' }}>
            IBC Laundering Services, Mid-Capacity Drums & Industrial Carboys
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Preserving Besto Container Industries' established core services in customer-owned IBC laundering, cage restoration, and secondary-market distribution of heavy-duty HMHDPE plastic drums and carboys. Tested to "as good as new" quality standards.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#service-matrix"
              className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Services & Containers</span>
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md transition-all cursor-pointer"
            >
              Contact Our Operations Team
            </button>
          </div>
        </div>
      </section>

      {/* 2. IBC LAUNDERING DEEP DIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
                Turnkey Tote Reconditioning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
                Full IBC Laundering & Reconditioning Service
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Besto Container Industries provides comprehensive laundering and reconditioning for client-owned and secondary market Intermediate Bulk Containers (IBCs). We accommodate all standard industrial designs, including tubular and wire cages compatible with global manufacturers such as <strong>Schütz, Kodama, and Mauser</strong>.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#F15A24] shrink-0 mt-0.5" />
                  <span><strong>Mechanical Hydro-Decanting:</strong> Stripping and purging stubborn viscous chemical residues from inner bottles.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#F15A24] shrink-0 mt-0.5" />
                  <span><strong>Chemical & Alkaline Hot Wash:</strong> Rotating wash nozzles delivering high-temperature cleaning agents.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
                  <span><strong>Tubular Cage & Pallet Trueing:</strong> Straightening dented grid bars and replacing defective discharge ball valves.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
                  <span><strong>ZLD Effluent Treatment:</strong> All effluent captured and neutralized in our on-site ETP under MPCB consent.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#121212] border-b border-slate-100 pb-2">
                Brand & Design Compatibility
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our Palghar wash division features multi-adapter couplings fitting standard 2-inch and 3-inch camlock/NPT discharge valves and standard DN150/DN225 top filling lids.
              </p>
              <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-lg text-sm text-slate-800">
                <strong>Volume Capability:</strong> Contract washing batches from 10 units to full truckloads (20–40 totes) with prompt turnaround.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE SPECIALTY PRODUCTS & SERVICES */}
      <section id="service-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
            Specialized Lineup
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
            Mid-Capacity Containers, Drums & Carboys
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Supplied with verified tare weight, clean bung fittings, and chemical-safe interior conditions:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legacyItems.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onEnquire={onEnquire}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. ENQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
              Specialized Request Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#121212]">
              Enquire About Laundering or Specialty Drums
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Tell us about your batch size, existing residue types, or required carboy capacity for prompt scheduling.
            </p>
          </div>

          <QuoteForm initialCategory="legacy" />
        </div>
      </section>

    </div>
  );
};
