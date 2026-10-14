import React from 'react';
import { PageView } from '../types';
import { AdaptiveImage } from '../components/AdaptiveImage';
import { 
  Droplets, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  FileCheck2,
  ChevronRight,
  Home
} from 'lucide-react';

interface FacilityPageProps {
  onRequestQuote: () => void;
  onNavigate?: (page: PageView) => void;
}

export const FacilityPage: React.FC<FacilityPageProps> = ({ onRequestQuote, onNavigate }) => {
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
            PROCESSING FACILITY & CERTIFICATIONS
          </span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-[#121212] text-white py-16 lg:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
            <span>Palghar, Maharashtra</span>
            <span aria-hidden="true">·</span>
            <span>MPCB Consented</span>
            <span aria-hidden="true">·</span>
            <span>Zero Liquid Discharge (ZLD)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl" style={{ textWrap: 'balance' }}>
            Processing Facility, Advanced ETP & Regulatory Compliance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Besto Container Industries operates a dedicated refurbishing and recycling infrastructure in Palghar, featuring an independent reconditioning division, structured workflows, an on-site Effluent Treatment Plant (ETP), and full MPCB authorizations under an ISO-certified Quality Management System.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Quality Audit</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="#etp-section"
              className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md transition-all cursor-pointer"
            >
              ETP & Wastewater Management
            </a>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED RECONDITIONING DIVISION & STRUCTURED WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
              Infrastructural Discipline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212] leading-tight">
              Independent Reconditioning Division
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              The company's refurbishing and recycling operations run in a dedicated facility with an independent reconditioning division, structured workflows and strict quality checkpoints. Each container type follows an isolated, contamination-controlled pathway to guarantee that industrial drums, barrels, and IBCs return to operational fitness.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Segregated storage yards prevent cross-contact between inbound raw container scrap, actively processing units, and finished, hermetically sealed dispatch inventories.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
              <AdaptiveImage
                imageKey="facility-reconditioning"
                aspectRatioClass="aspect-[16/10]"
                className="w-full h-72 object-cover"
                showCaption={true}
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#121212] border-b border-slate-200 pb-2">
                Structured Division Workstations
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="p-3 bg-white border border-slate-200 rounded-lg border-l-4 border-l-[#F15A24]">
                  <strong className="text-[#121212] block text-sm font-bold">Inbound Sorting & Diagnostic Area</strong>
                  Visual inspection, tare weight verification, and residual evaluation before entry.
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg border-l-4 border-l-[#F15A24]">
                  <strong className="text-[#121212] block text-sm font-bold">Mechanical De-Denting & Chime Roll Station</strong>
                  Restoring cylindrical geometry and sealing chimes on heavy-duty M.S. barrels.
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg border-l-4 border-l-[#F7941D]">
                  <strong className="text-[#121212] block text-sm font-bold">Multi-Stage Wash Lines & ETP Interlock</strong>
                  Hot-water wash, alkaline chemical de-greasing, and neutralizing rinse loops.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ZERO LIQUID DISCHARGE & ADVANCED ETP */}
      <section id="etp-section" className="bg-slate-50 border-y border-slate-200 py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
                Environmental Stewardship
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
                Zero Liquid Discharge (ZLD) via Modern On-Site ETP
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Sustainability is integral to industrial reconditioning. Besto Container Industries operates around Zero Liquid Discharge (ZLD) principles, meaning zero untreated industrial wash-water is released into municipal drainage or local soil.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                The Palghar complex features an on-site modern Effluent Treatment Plant (ETP) specifically engineered to handle chemical rinses, oil-water emulsions, and alkaline residues generated during drum decontamination.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                <AdaptiveImage
                  imageKey="facility-etp-plant"
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-72 object-cover"
                  showCaption={true}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
                <Droplets size={20} />
              </div>
              <h3 className="text-base font-bold text-[#121212]">Primary Physical & Chemical Treatment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Oil-water gravity separators, equalization tanks, coagulation, and flocculation systems neutralize residual chemicals.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F7941D]">
                <Droplets size={20} />
              </div>
              <h3 className="text-base font-bold text-[#121212]">Biological & Membrane Filtration</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Aerobic biological digestion coupled with sand and activated carbon filtration beds purifies effluent to reusable industrial standards.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
                <Droplets size={20} />
              </div>
              <h3 className="text-base font-bold text-[#121212]">Closed-Loop Water Recycling</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Treated water is recirculated back into pre-wash stages, significantly reducing fresh groundwater abstraction.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STEP-BY-STEP RECONDITIONING WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
            Quality Checkpoints
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
            Six-Stage Standardized Processing Workflow
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every container passing through our Palghar facility is held to reproducible quality criteria across 6 distinct checkpoints:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-[#121212]">Inbound Diagnostic & Tare Weight Check</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Containers undergo visual body inspection and calibrated tare weight verification. Substandard, deeply pitted, or chemically compromised substrates are rejected immediately.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-[#121212]">Hydraulic De-Denting & Chime Roll</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Precision pneumatic and hydraulic expanders restore internal barrel dimensions, straighten chime seams, and recreate original circular geometry for uniform palletization.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-[#121212]">Multi-Stage Hot-Water Chemical Wash</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automated rotary nozzle wash cycles with heated alkaline cleaning agents strip oil, chemical residues, and scale. Wash liquors drain directly into our on-site ETP closed circuit.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              4
            </div>
            <h3 className="text-base font-bold text-[#121212]">Pneumatic Pressure Decay Leak Testing</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              100% of close-mouth barrels and IBC bottles undergo positive air-pressure charging with soapy water seam checks and digital decay transducers to verify absolute hermetic seal.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              5
            </div>
            <h3 className="text-base font-bold text-[#121212]">Internal Epoxy Lining or Exterior Paint</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Application of bake-cured food/chemical-grade epoxy phenolic coatings for corrosive materials, along with anti-rust exterior industrial coatings with client color coding.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#121212] text-white font-mono font-bold text-sm flex items-center justify-center">
              6
            </div>
            <h3 className="text-base font-bold text-[#121212]">Final QA Stamp & Staged Storage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pre-dispatch QA inspection, bung and gasket fitting, security seal application, and storage in covered staging bays protected from weather and environmental dust.
            </p>
          </div>
        </div>
      </section>

      {/* 5. REGULATORY COMPLIANCE: MPCB & ISO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
            Compliance Authorizations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
            Maharashtra Pollution Control Board (MPCB) & ISO Certified QMS
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Industrial reconditioning without formal statutory oversight introduces significant corporate liability. Besto Container Industries operates with complete legal transparency:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
            <div className="flex items-center gap-3 text-emerald-700">
              <FileCheck2 size={24} />
              <h3 className="text-xl font-bold text-[#121212]">MPCB Consents & Clearances</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              All processing activities, including barrel de-denting, washing lines, chemical usage, and effluent recycling, are formally consented by the <strong>Maharashtra Pollution Control Board (MPCB)</strong> under valid Consent to Operate (CTO) frameworks.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600 shrink-0" />
                <span>Authorized handling of industrial packaging containers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600 shrink-0" />
                <span>Audited ETP operations meeting Maharashtra effluent norms</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600 shrink-0" />
                <span>Hazardous waste disposal compliance with approved common facilities</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
            <div className="flex items-center gap-3 text-[#F15A24]">
              <ShieldCheck size={24} />
              <h3 className="text-xl font-bold text-[#121212]">ISO 9001:2015 Quality Management System</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              The facility operates under an ISO-certified Quality Management System. Workflows, testing checklists, maintenance routines, and inspection criteria are formally documented to ensure consistent output across every production batch.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#F15A24] shrink-0" />
                <span>Documented standard operating procedures (SOPs)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#F15A24] shrink-0" />
                <span>Traceable inspection stages for pressure & coating</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#F15A24] shrink-0" />
                <span>Continuous process improvement and corrective audits</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Schedule a Facility Audit or Request Batch Specifications
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Our engineering team welcomes technical compliance visits and provides container test documentation for procurement approval.
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            Contact Technical Team
          </button>
        </div>
      </section>

    </div>
  );
};
