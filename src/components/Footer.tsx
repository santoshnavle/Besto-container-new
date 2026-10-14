import React from 'react';
import { PageView } from '../types';
import { COMPANY_DETAILS } from '../data/company';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { BestoLogo } from './BestoLogo';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectProduct?: (productId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#121212] text-slate-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Brand & Corporate Identity with Original PNG Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Standalone Official PNG Logo on clean container with breathing space */}
              <BestoLogo 
                className="w-auto h-14"
                imgClassName="h-14 w-auto object-contain"
                variant="on-dark"
                showBreathingSpace={true}
              />
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Industrial packaging specialists delivering rigorously inspected refurbished containers under registered brand <strong className="text-white">BESTOSIA®</strong> alongside factory-new barrels, drums, and IBC solutions.
            </p>

            <div className="pt-2 space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#F7941D] shrink-0" />
                <span>MPCB Authorized Facility & ZLD ETP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-[#F15A24] shrink-0" />
                <span>ISO 9001:2015 Certified QMS</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links in UPPERCASE */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('new-packaging')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  PRODUCTS (DRUMS, BARRELS & IBCs)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('facility')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  PROCESSING FACILITY & CERTIFICATIONS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('legacy-services')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  LEGACY SERVICES & LAUNDERING
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  BLOG & KNOWLEDGE BASE
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F15A24] transition-colors text-left cursor-pointer uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  CONTACT US
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Coordinates */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Contact Details</h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Palghar, Maharashtra, India<br />
                  <span className="text-slate-400 text-xs sm:text-sm">Serving Mumbai, Gujarat & Pan-India</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={17} className="text-[#F7941D] shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.contact.phone}`} className="hover:text-[#F15A24] transition-colors cursor-pointer">
                  {COMPANY_DETAILS.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={17} className="text-[#F7941D] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="hover:text-[#F15A24] transition-colors cursor-pointer">
                  {COMPANY_DETAILS.contact.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={COMPANY_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold text-sm cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={15} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Procurement Action */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Commercial Procurement</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Direct procurement desk for bulk contract supplies, trial samples, and technical compatibility assessments.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-4 bg-[#F15A24] hover:bg-[#D94814] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={15} />
                <span>Contact Our Team</span>
              </button>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-slate-400">
              <span className="text-slate-300 font-semibold block">Operating Hours:</span>
              Mon – Sat: 9:00 AM – 6:30 PM IST
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance Statements */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} Besto Container Industries. All rights reserved. BESTOSIA® is a registered trademark brand.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <span>Palghar, Maharashtra Hub</span>
            <span aria-hidden="true">·</span>
            <span>Zero Liquid Discharge (ZLD)</span>
            <span aria-hidden="true">·</span>
            <span>ISO 9001:2015 Certified QMS</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-500 hover:text-[#F15A24] transition-colors cursor-pointer text-xs"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
