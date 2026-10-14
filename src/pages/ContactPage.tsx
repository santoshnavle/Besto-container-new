import React from 'react';
import { PageView } from '../types';
import { COMPANY_DETAILS } from '../data/company';
import { QuoteForm } from '../components/QuoteForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Truck,
  ArrowUpRight,
  ChevronRight,
  Home
} from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
            CONTACT US
          </span>
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-[#121212] text-white py-16 lg:py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F7941D] font-semibold">
            <span>Commercial Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Palghar, Maharashtra</span>
            <span aria-hidden="true">·</span>
            <span>Direct Sales Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl" style={{ textWrap: 'balance' }}>
            Contact & Request a Commercial Quotation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Connect directly with Besto Container Industries for product quotations, container specification sheets, trial batch dispatches, and technical compatibility consultations.
          </p>
        </div>
      </section>

      {/* 2. FORM & COORDINATES SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Quotation Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F15A24] font-semibold">
                Official Lead Capture
              </span>
              <h2 className="text-2xl font-bold text-[#121212]">
                Quotation Request & Technical Requirement Form
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Submit your procurement requirements below. Every submission generates a traceable BCI inquiry reference.
              </p>
            </div>

            <QuoteForm />
          </div>

          {/* Right Column: Verified Contact Information & Facility Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Communication Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] border-b border-slate-200 pb-2">
                Verified Corporate Coordinates
              </h3>

              <ul className="space-y-5 text-sm text-slate-700">
                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F15A24] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong className="block text-[#121212] text-base font-bold">Facility & Headquarters</strong>
                    <span className="leading-relaxed text-slate-600 block mt-0.5 text-sm">
                      {COMPANY_DETAILS.contact.address}
                    </span>
                    <span className="text-xs text-slate-500 block mt-1">
                      Serving Mumbai, Tarapur, Vapi, Ankleshwar & Pan-India
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F15A24] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong className="block text-[#121212] text-base font-bold">Direct Commercial Telephone</strong>
                    <a
                      href={`tel:${COMPANY_DETAILS.contact.phone}`}
                      className="text-[#121212] font-semibold hover:text-[#F15A24] transition-colors block mt-0.5 text-base cursor-pointer"
                    >
                      {COMPANY_DETAILS.contact.phoneDisplay}
                    </a>
                    <span className="text-xs text-slate-500 block mt-1">
                      Founder & Sales Desk: Sayeed Ahmed
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F15A24] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong className="block text-[#121212] text-base font-bold">Official Commercial Email</strong>
                    <a
                      href={`mailto:${COMPANY_DETAILS.contact.email}`}
                      className="text-[#121212] font-semibold hover:text-[#F15A24] transition-colors block mt-0.5 text-base cursor-pointer"
                    >
                      {COMPANY_DETAILS.contact.email}
                    </a>
                    <span className="text-xs text-slate-500 block mt-1">
                      Send RFPs, POs & supplier audits
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F15A24] shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong className="block text-[#121212] text-base font-bold">Operating & Dispatch Schedule</strong>
                    <span className="text-slate-600 block mt-0.5 text-sm">
                      {COMPANY_DETAILS.contact.workingHours}
                    </span>
                  </div>
                </li>
              </ul>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 border-t border-slate-200">
                <a
                  href={COMPANY_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <MessageSquare size={18} />
                  <span>Connect Instantly via WhatsApp Desk</span>
                  <ArrowUpRight size={15} />
                </a>
                <p className="text-xs text-center text-slate-500 mt-2">
                  Recommended for instant spot availability and freight estimates.
                </p>
              </div>
            </div>

            {/* Logistics & Transit Notice */}
            <div className="bg-[#121212] text-white rounded-xl p-6 sm:p-7 space-y-3 border border-zinc-800 shadow-sm">
              <div className="flex items-center gap-2 text-[#F7941D]">
                <Truck size={20} />
                <h4 className="text-sm font-bold uppercase tracking-wider">Logistics & Dispatch Notes</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Full truckload (FTL) and part-load dispatches scheduled regularly across Maharashtra and South Gujarat. Multi-unit palletized shipments arranged for chemical plants, refineries, and container freight stations.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
