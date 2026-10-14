import React from 'react';
import { PageView, ProductItem } from '../types';
import { PRODUCTS } from '../data/products';
import { COMPANY_DETAILS } from '../data/company';
import { ProductCard } from '../components/ProductCard';
import { AdaptiveImage } from '../components/AdaptiveImage';
import { 
  ShieldCheck, 
  Leaf, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Droplets,
  Phone,
  Mail,
  MapPin,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onEnquire: (product: ProductItem) => void;
  onViewDetails: (product: ProductItem) => void;
  onRequestQuote: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onEnquire,
  onViewDetails,
}) => {
  // Four representative products for the decluttered homepage:
  // 1. BESTOSIA® refurbished steel barrel (OTP)
  // 2. HDPE drum (HDPEC)
  // 3. Refurbished IBC container (IBC MAX)
  // 4. Brand-new drums/barrels (New M.S. Barrels)
  const featuredProductIds = ['bestosia-otp', 'bestosia-hdpec', 'bestosia-ibc-max', 'new-ms-barrels'];
  const featuredProducts = featuredProductIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is ProductItem => Boolean(p));

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#121212] text-white overflow-hidden py-16 sm:py-20 lg:py-28 border-b border-zinc-800">
        {/* Subtle industrial grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"></div>
        
        {/* Soft brand glow */}
        <div className="absolute -top-40 right-10 w-96 h-96 bg-[#F15A24]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 left-10 w-96 h-96 bg-[#F7941D]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline, Supporting Paragraph, and Key CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Brand kicker with warm yellow-orange accent */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
                <span>Besto Container Industries</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Palghar, Maharashtra</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>MPCB Authorized & ISO QMS</span>
              </div>

              {/* Clear headline about Besto Container Industries & industrial packaging */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
                Industrial Packaging Solutions — Certified Refurbished & Brand-New Drums, Barrels & IBCs
              </h1>

              {/* Concise supporting paragraph covering refurbished and new drums, barrels and IBCs */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Besto Container Industries provides high-performance industrial packaging across India. From certified reconditioned steel barrels, HDPE drums, and 1000L IBCs under our registered <strong className="text-white font-bold">BESTOSIA®</strong> brand to factory-new containers, engineered with rigorous ISO quality control and sustainable Zero Liquid Discharge (ZLD) operations.
              </p>

              {/* Action Buttons: Prominent "EXPLORE PRODUCTS" + Secondary "CONTACT OUR TEAM" */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('new-packaging')}
                  className="px-7 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-7 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Contact Our Team</span>
                </button>
              </div>

              {/* Verified Technical Proof Points */}
              <div className="pt-6 border-t border-zinc-800 grid grid-cols-3 gap-4 text-xs sm:text-sm text-slate-400">
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">MPCB Consented</div>
                  <div className="mt-0.5 text-slate-400 text-xs sm:text-sm">Authorized Industrial Division</div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">ISO 9001:2015</div>
                  <div className="mt-0.5 text-slate-400 text-xs sm:text-sm">Quality Management System</div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">ZLD ETP Plant</div>
                  <div className="mt-0.5 text-slate-400 text-xs sm:text-sm">Zero Liquid Discharge Facility</div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Packaging Image & Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#18181B] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm space-y-4 p-5">
                {/* Hero Warehouse Logistics Photography Banner */}
                <div className="rounded-lg overflow-hidden border border-zinc-700">
                  <AdaptiveImage
                    imageKey="hero-warehouse"
                    aspectRatioClass="aspect-[16/9]"
                    className="w-full h-56 sm:h-64 object-cover"
                    priority={true}
                    showCaption={true}
                  />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#F15A24]/15 border border-[#F15A24]/30 text-[#F15A24] flex items-center justify-center font-bold text-sm">
                      B
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">Industrial Packaging Portfolio</div>
                      <div className="text-xs text-slate-400 font-mono">Refurbished BESTOSIA® & Brand-New</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#F7941D] font-semibold">Palghar Hub</span>
                </div>

                {/* Concise category overview */}
                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                  <div className="p-2.5 bg-[#121212]/90 border border-zinc-800/80 rounded">
                    <div className="font-semibold text-white">Steel Barrels</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">OTP & CMP 210L</div>
                  </div>
                  <div className="p-2.5 bg-[#121212]/90 border border-zinc-800/80 rounded">
                    <div className="font-semibold text-white">HDPE Drums</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">7.8–8.5 kg Tare Weight</div>
                  </div>
                  <div className="p-2.5 bg-[#121212]/90 border border-zinc-800/80 rounded">
                    <div className="font-semibold text-white">1000L IBC Totes</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Export Optimized MAX</div>
                  </div>
                  <div className="p-2.5 bg-[#121212]/90 border border-zinc-800/80 rounded">
                    <div className="font-semibold text-white">Brand-New Range</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">G.I., M.S. & Virgin IBCs</div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('new-packaging')}
                    className="w-full py-2.5 bg-[#F15A24] hover:bg-[#D94814] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors text-center shadow-sm cursor-pointer"
                  >
                    View All Products & Specifications →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. KEY ADVANTAGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs sm:text-sm font-bold text-[#F15A24] uppercase tracking-wider font-mono">
            Key Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212] leading-tight">
            Engineered for Industrial Reliability & Compliance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Consolidate your industrial container procurement with verified processing discipline, regulatory safety, and commercial efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Advantage 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-3 hover:border-[#F15A24]/50 hover:shadow-md transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Refurbished & New Under One Roof
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Procure cost-effective certified reconditioned BESTOSIA® packaging alongside brand-new factory barrels from a single accountable partner.
            </p>
          </div>

          {/* Advantage 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-3 hover:border-[#F15A24]/50 hover:shadow-md transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F7941D]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Quality-Focused Processing
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every container undergoes mechanical de-denting, multi-stage chemical decontamination, and 100% pneumatic pressure decay leak testing.
            </p>
          </div>

          {/* Advantage 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-3 hover:border-[#F15A24]/50 hover:shadow-md transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F15A24]">
              <Leaf size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Environmental Responsibility
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Operated around Zero Liquid Discharge (ZLD) principles with an on-site modern Effluent Treatment Plant (ETP) for responsible water recycling.
            </p>
          </div>

          {/* Advantage 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-3 hover:border-[#F15A24]/50 hover:shadow-md transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F7941D]">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Decades of Packaging Expertise
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Decades of specialized reconditioning and supply serving chemical, petroleum, and export manufacturers across Maharashtra, Gujarat, and nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Exactly 4 Representative Cards + One "VIEW ALL PRODUCTS" Button) */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#F15A24] uppercase tracking-wider font-mono">
                Featured Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212]">
                Representative Industrial Packaging Categories
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Explore representative models from our refurbished BESTOSIA® range and brand-new container solutions:
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('new-packaging')}
              className="hidden md:inline-flex px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] rounded-md transition-colors items-center gap-2 shrink-0 shadow-sm cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Exactly 4 Representative Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={onEnquire}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          {/* Prominent "VIEW ALL PRODUCTS" Button leading to Products Page */}
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => onNavigate('new-packaging')}
              className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all shadow-md inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* 4. ABOUT BESTO CONTAINER INDUSTRIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs sm:text-sm font-bold text-[#F15A24] uppercase tracking-wider font-mono">
              About Besto Container Industries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121212] leading-tight">
              A Proven Legacy in Industrial Packaging Reconditioning
            </h2>
            <div className="w-14 h-1.5 bg-[#F15A24] rounded-full"></div>
          </div>
          
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              Founded by <strong>Sayeed Ahmed</strong>, the organizational roots trace back to 1995 in Mumbai, leading to the formal establishment of Besto Container Industries in 2009. Over decades of specialized trade and engineering reconditioning, the company has grown into a trusted packaging partner for chemical, petroleum, pharmaceutical, and export manufacturers across Maharashtra, Gujarat, and nationwide.
            </p>
            <p>
              Operating from an advanced infrastructural complex in <strong>Palghar, Maharashtra</strong>, the company maintains independent divisions for drum reconditioning, IBC restoration, surface treatments, and environmental effluent recycling.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm sm:text-base text-slate-800 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#F15A24]" />
                <span>Founded by Sayeed Ahmed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#F15A24]" />
                <span>Roots from 1995 (Est. 2009)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#F15A24]" />
                <span>Palghar Infrastructure</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="text-sm sm:text-base font-bold text-[#F15A24] hover:text-[#D94814] uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESSING FACILITY & QUALITY */}
      <section className="bg-[#121212] text-white py-16 lg:py-24 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
              Processing Facility & Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Dedicated Processing Division, Zero Liquid Discharge & Compliance
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The company's refurbishing operations run in a dedicated facility in Palghar with an independent reconditioning division, structured workflows, and strict quality checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 bg-[#18181B] border border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#F7941D]">
                <Droplets size={22} />
                <h3 className="text-lg font-bold text-white">Zero Liquid Discharge (ZLD) via On-Site ETP</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Operated around ZLD principles with an on-site modern Effluent Treatment Plant (ETP) ensuring responsible wastewater treatment, zero untreated discharge, and closed-loop water conservation.
              </p>
            </div>

            <div className="p-6 sm:p-7 bg-[#18181B] border border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#F15A24]">
                <ShieldCheck size={22} />
                <h3 className="text-lg font-bold text-white">MPCB Authorizations & ISO Quality Management</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Authorizations and consents obtained from the Maharashtra Pollution Control Board (MPCB), operating strictly under an ISO-certified Quality Management System for consistent inspection.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('facility')}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] rounded-md transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Explore Our Facility</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* 6. FINAL CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
                Ready to Discuss Your Industrial Packaging Requirements?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Connect with Our Technical & Sales Procurement Team
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Speak directly with our technical team in Palghar for bulk supply contracts, container specifications, or spot pricing across Maharashtra and nationwide.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#F7941D]" />
                  <span>+91-9833853196</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#F7941D]" />
                  <span>info@bestocontainer.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#F7941D]" />
                  <span>Palghar, Maharashtra, India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-4 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-all text-center shadow-sm cursor-pointer"
              >
                Contact Our Team
              </button>
              <a
                href={COMPANY_DETAILS.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-white border border-emerald-500/40 hover:bg-emerald-600/20 rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp (+91-9833853196)</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
