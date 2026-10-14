import React from 'react';
import { PageView } from '../types';
import { 
  Target, 
  ArrowRight,
  Award,
  ChevronRight,
  Home
} from 'lucide-react';

interface AboutPageProps {
  onRequestQuote: () => void;
  onNavigate?: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRequestQuote, onNavigate }) => {
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
            ABOUT US
          </span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-[#121212] text-white py-16 lg:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
            <span>Corporate Profile</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2009 (Roots from 1995)</span>
            <span aria-hidden="true">·</span>
            <span>Palghar, Maharashtra</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl" style={{ textWrap: 'balance' }}>
            About Besto Container Industries
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Established under the visionary leadership of <strong>Sayeed Ahmed</strong>, Besto Container Industries is a recognized supplier, distributor, and reconditioner of industrial packaging solutions, delivering sustainable efficiency to chemical, petroleum, and manufacturing leaders across India.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate && onNavigate('new-packaging')}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Products Portfolio</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Contact Leadership Desk</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. COMPANY HERITAGE & JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
              Verified Corporate History
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
              From Industrial Trade to Engineering Reconditioning
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              The organizational roots trace back to 1995 in Mumbai, when founder and managing partner <strong>Sayeed Ahmed</strong> initiated container supply operations to meet the surging demands of Western India's chemical and process industries.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              With decades of deep domain understanding, <strong>Besto Container Industries</strong> was formally incorporated in 2009 with dedicated manufacturing and reconditioning infrastructure based in Palghar, Maharashtra. Over the years, the company developed specialized processes for de-denting, chemical decontamination, epoxy lining, and pressure-testing drums, barrels, and Intermediate Bulk Containers (IBCs).
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Today, the enterprise serves key industrial belts in Mumbai, Tarapur, Vapi, Ankleshwar, and pan-India with its proprietary registered refurbished brand <strong>BESTOSIA®</strong> and virgin packaging lines.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] border-b border-slate-200 pb-2">
              Key Corporate Milestones
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-lg bg-[#121212] text-white border-l-3 border-[#F15A24] font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  1995
                </div>
                <div>
                  <div className="text-base font-bold text-[#121212]">Foundational Industrial Roots</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Sayeed Ahmed establishes container supply operations in Mumbai, servicing industrial clients across Maharashtra and Gujarat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-lg bg-[#121212] text-white border-l-3 border-[#F15A24] font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  2009
                </div>
                <div>
                  <div className="text-base font-bold text-[#121212]">Establishment of Besto Container Industries</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Formation of Besto Container Industries and expansion into dedicated reconditioning infrastructure in Palghar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-lg bg-[#121212] text-white border-l-3 border-[#F7941D] font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  ZLD
                </div>
                <div>
                  <div className="text-base font-bold text-[#121212]">Zero Liquid Discharge ETP Integration</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Commissioning of specialized on-site Effluent Treatment Plant (ETP) under MPCB authorizations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-lg bg-[#121212] text-white border-l-3 border-[#F15A24] font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  BRAND
                </div>
                <div>
                  <div className="text-base font-bold text-[#121212]">BESTOSIA® Registered Brand Launch</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Registration and commercial rollout of the BESTOSIA® certified reconditioned container portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE MISSION & INDUSTRIAL VALUES */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#F15A24] uppercase tracking-wider font-mono">
              Operating Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
              Guiding Industrial Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#121212]">Quality Integrity</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Zero tolerance for structural defects. 100% pneumatic pressure testing on all closed-head containers ensures complete transport security.
              </p>
            </div>

            <div className="p-7 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F7941D]">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#121212]">Circular Sustainability</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Reconditioning steel and polymer packaging reduces industrial carbon emissions, saves virgin ore extraction, and conserves industrial water through on-site ZLD recycling.
              </p>
            </div>

            <div className="p-7 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#121212]">Reliable Availability</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Comprehensive buffer staging at our Palghar facility guarantees same-day or next-day dispatches for emergency containment requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEOGRAPHIC LOGISTICS ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs sm:text-sm font-bold text-[#F15A24] uppercase tracking-wider font-mono">
            Strategic Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
            Palghar Hub: Connecting Western India's Chemical Belt
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Ideally situated along the Mumbai-Ahmedabad industrial artery with rapid access to key manufacturing zones:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white hover:border-[#F15A24]/40 hover:shadow-md transition-all">
            <div className="text-base font-bold text-[#121212]">Tarapur MIDC</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Immediate proximity for same-day delivery of chemical barrels and emergency replacement drums.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white hover:border-[#F15A24]/40 hover:shadow-md transition-all">
            <div className="text-base font-bold text-[#121212]">Vapi & Sarigam GIDC</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Daily freight routes into South Gujarat's pharmaceutical, dyes, and chemical manufacturing corridors.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white hover:border-[#F15A24]/40 hover:shadow-md transition-all">
            <div className="text-base font-bold text-[#121212]">JNPT Port (Nhava Sheva)</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Export-ready staging for Bestosia IBC MAX (20 units/container) directly into maritime cargo gateways.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white hover:border-[#F15A24]/40 hover:shadow-md transition-all">
            <div className="text-base font-bold text-[#121212]">Mumbai Metropolitan Area</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Prompt supply for petroleum blending facilities, lubricants, food processors, and paint manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Partner with Besto Container Industries
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Contact our sales desk to discuss annual container supply contracts, product trial samples, or custom epoxy requirements.
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            Contact Our Team
          </button>
        </div>
      </section>

    </div>
  );
};
