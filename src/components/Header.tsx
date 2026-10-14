import React, { useState, useRef, useEffect } from 'react';
import { PageView } from '../types';
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck, Layers, Box } from 'lucide-react';
import { BestoLogo } from './BestoLogo';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onRequestQuoteClick: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onRequestQuoteClick,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (productId: string) => {
    if (onSelectProduct) {
      onSelectProduct(productId);
    } else {
      window.location.hash = `product/${productId}`;
    }
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 h-22 sm:h-24">
        
        {/* Zone 1: Standalone Official PNG Logo with generous breathing space */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center justify-center p-2 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A24] transition-all cursor-pointer hover:bg-orange-50/40"
          aria-label="Besto Container Industries Home"
        >
          <BestoLogo
            className="w-auto h-12 sm:h-14 md:h-15"
            imgClassName="h-12 sm:h-14 md:h-15 w-auto object-contain"
          />
        </button>

        {/* Zone 2: Navigation Links in EXACT required order with UPPERCASE styling */}
        {/* ORDER: HOME | ABOUT US | PRODUCTS | PROCESSING FACILITY & CERTIFICATIONS | CONTACT US */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold tracking-wider uppercase" aria-label="Main Navigation">
          
          {/* 1. HOME */}
          <button
            onClick={() => handleLinkClick('home')}
            className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer ${
              currentPage === 'home' ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]' : 'text-slate-800'
            }`}
          >
            HOME
          </button>

          {/* 2. ABOUT US */}
          <button
            onClick={() => handleLinkClick('about')}
            className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer ${
              currentPage === 'about' ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]' : 'text-slate-800'
            }`}
          >
            ABOUT US
          </button>

          {/* 3. PRODUCTS (with comprehensive Dropdown Menu) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleLinkClick('new-packaging')}
                className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'new-packaging' || currentPage === 'product-detail' || currentPage === 'legacy-services'
                    ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]'
                    : 'text-slate-800'
                }`}
                aria-expanded={productsDropdownOpen}
                aria-haspopup="true"
              >
                <span>PRODUCTS</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    productsDropdownOpen ? 'rotate-180 text-[#F15A24]' : 'text-slate-500'
                  }`}
                />
              </button>
            </div>

            {/* Desktop Products Dropdown Popover */}
            {productsDropdownOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-xl shadow-2xl border border-slate-200/90 p-5 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                {/* Header overview link */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    INDUSTRIAL PACKAGING CATALOGUE
                  </span>
                  <button
                    onClick={() => handleLinkClick('new-packaging')}
                    className="text-xs font-bold text-[#F15A24] hover:text-[#D94814] flex items-center gap-1 cursor-pointer"
                  >
                    <span>VIEW ALL PRODUCTS OVERVIEW</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-5 text-left normal-case">
                  {/* Category 1: Refurbished Packaging - BESTOSIA */}
                  <div className="col-span-6 space-y-2 pr-3 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F15A24]">
                      <ShieldCheck size={14} className="shrink-0" />
                      <span>REFURBISHED PACKAGING – BESTOSIA®</span>
                    </div>
                    <p className="text-xs text-slate-500 normal-case mb-2 leading-relaxed">
                      Rigorous de-denting, multi-stage wash, pressure tested, ISO-certified.
                    </p>
                    
                    <ul className="space-y-1 text-xs">
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-otp')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>OTP</strong> · Open Top Plain Steel Barrel</span>
                          <span className="text-[11px] text-slate-400 font-mono">210L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-otec')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>OTEC</strong> · Open Top Epoxy Coated Barrel</span>
                          <span className="text-[11px] text-slate-400 font-mono">210L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-cmp')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>CMP</strong> · Close Mouth Plain Steel Barrel</span>
                          <span className="text-[11px] text-slate-400 font-mono">210L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-gicm')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>GICM</strong> · Galvanized Iron Close Mouth</span>
                          <span className="text-[11px] text-slate-400 font-mono">210L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-hdpec')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>HDPEC</strong> · HDPE Plastic Barrel (7.8–8.5 kg)</span>
                          <span className="text-[11px] text-slate-400 font-mono">210L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-ibc-max')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>IBC MAX</strong> · Export Optimized 1000L</span>
                          <span className="text-[11px] text-slate-400 font-mono">1000L</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleProductSelect('bestosia-ibc-premium')}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-orange-50 hover:text-[#F15A24] font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span><strong>IBC Premium</strong> · High-Grade Multi-Cleaned</span>
                          <span className="text-[11px] text-slate-400 font-mono">1000L</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Category 2 & 3: New Drums & Barrels and IBC Containers */}
                  <div className="col-span-6 space-y-4">
                    {/* New Drums & Barrels */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                        <Layers size={14} className="text-[#F7941D] shrink-0" />
                        <span>NEW DRUMS & BARRELS</span>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li>
                          <button
                            onClick={() => handleProductSelect('new-gi-barrels')}
                            className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-100 font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>Brand-New Galvanized Iron (G.I.) Barrels</span>
                            <span className="text-[11px] text-slate-400 font-mono">Virgin</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleProductSelect('new-ms-barrels')}
                            className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-100 font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>Brand-New Mild Steel (M.S.) Barrels</span>
                            <span className="text-[11px] text-slate-400 font-mono">Virgin</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* IBC Containers */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                        <Box size={14} className="text-[#F7941D] shrink-0" />
                        <span>IBC CONTAINERS</span>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li>
                          <button
                            onClick={() => handleProductSelect('new-ibc-totes')}
                            className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-100 font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>Brand-New 1000L IBC Containers</span>
                            <span className="text-[11px] text-slate-400 font-mono">Virgin</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleProductSelect('legacy-ibc-laundering')}
                            className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-100 font-medium text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>IBC Laundering & Reconditioning Service</span>
                            <span className="text-[11px] text-slate-400 font-mono">Service</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleLinkClick('new-packaging')}
                        className="w-full py-2 px-3 bg-slate-100 hover:bg-orange-50 hover:text-[#F15A24] text-slate-700 text-xs font-semibold rounded transition-colors text-center cursor-pointer"
                      >
                        EXPLORE ALL PACKAGING SOLUTIONS →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. PROCESSING FACILITY & CERTIFICATIONS */}
          <button
            onClick={() => handleLinkClick('facility')}
            className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer ${
              currentPage === 'facility' ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]' : 'text-slate-800'
            }`}
          >
            PROCESSING FACILITY & CERTIFICATIONS
          </button>

          {/* 5. BLOG */}
          <button
            onClick={() => handleLinkClick('blog')}
            className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer ${
              currentPage === 'blog' || currentPage === 'blog-detail' ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]' : 'text-slate-800'
            }`}
          >
            BLOG
          </button>

          {/* 6. CONTACT US */}
          <button
            onClick={() => handleLinkClick('contact')}
            className={`whitespace-nowrap transition-colors py-2 px-1 hover:text-[#F15A24] cursor-pointer ${
              currentPage === 'contact' ? 'text-[#F15A24] font-bold border-b-2 border-[#F15A24]' : 'text-slate-800'
            }`}
          >
            CONTACT US
          </button>
        </nav>

        {/* Zone 3: Primary Header CTA Action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={onRequestQuoteClick}
            className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] transition-all rounded-md shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            REQUEST A QUOTE
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onRequestQuoteClick}
            className="px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#F15A24] hover:bg-[#D94814] rounded-md whitespace-nowrap shadow-2xs cursor-pointer"
          >
            QUOTE
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#F15A24] hover:bg-orange-50 rounded-md focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-8 space-y-2 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          
          {/* 1. HOME */}
          <button
            onClick={() => handleLinkClick('home')}
            className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer ${
              currentPage === 'home' ? 'bg-orange-50 text-[#F15A24] border-l-4 border-[#F15A24]' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            HOME
          </button>

          {/* 2. ABOUT US */}
          <button
            onClick={() => handleLinkClick('about')}
            className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer ${
              currentPage === 'about' ? 'bg-orange-50 text-[#F15A24] border-l-4 border-[#F15A24]' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            ABOUT US
          </button>

          {/* 3. PRODUCTS (with accordion dropdown) */}
          <div className="rounded-md border border-slate-200/80 overflow-hidden">
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-bold tracking-wider uppercase text-slate-800 bg-slate-50/70 hover:bg-orange-50 transition-colors cursor-pointer"
              aria-expanded={mobileProductsOpen}
            >
              <span>PRODUCTS</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-slate-500 ${
                  mobileProductsOpen ? 'rotate-180 text-[#F15A24]' : ''
                }`}
              />
            </button>

            {mobileProductsOpen && (
              <div className="p-3 bg-white space-y-3 text-xs border-t border-slate-100">
                <button
                  onClick={() => handleLinkClick('new-packaging')}
                  className="w-full text-left font-bold text-[#F15A24] uppercase tracking-wide py-1 border-b border-slate-100 flex items-center justify-between cursor-pointer"
                >
                  <span>OVERVIEW: ALL PRODUCTS</span>
                  <ArrowRight size={13} />
                </button>

                {/* BESTOSIA Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-[#F15A24]">
                    REFURBISHED PACKAGING – BESTOSIA®
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pl-1">
                    <button
                      onClick={() => handleProductSelect('bestosia-otp')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      OTP (Open Top Plain)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-otec')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      OTEC (Epoxy Coated)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-cmp')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      CMP (Close Mouth Plain)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-gicm')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      GICM (Galvanized Iron)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-hdpec')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      HDPEC (HDPE Plastic)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-ibc-max')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer"
                    >
                      IBC MAX (1000L)
                    </button>
                    <button
                      onClick={() => handleProductSelect('bestosia-ibc-premium')}
                      className="text-left py-1 px-1.5 rounded hover:bg-orange-50 text-slate-700 cursor-pointer col-span-2"
                    >
                      IBC Premium (Multi-Cleaned 1000L)
                    </button>
                  </div>
                </div>

                {/* New Packaging */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    NEW DRUMS & BARRELS
                  </div>
                  <div className="space-y-1 pl-1">
                    <button
                      onClick={() => handleProductSelect('new-gi-barrels')}
                      className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      Brand-New Galvanized Iron (G.I.) Barrels
                    </button>
                    <button
                      onClick={() => handleProductSelect('new-ms-barrels')}
                      className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      Brand-New Mild Steel (M.S.) Barrels
                    </button>
                  </div>
                </div>

                {/* IBC Containers */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    IBC CONTAINERS
                  </div>
                  <div className="space-y-1 pl-1">
                    <button
                      onClick={() => handleProductSelect('new-ibc-totes')}
                      className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      Brand-New 1000L IBC Totes
                    </button>
                    <button
                      onClick={() => handleProductSelect('legacy-ibc-laundering')}
                      className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      IBC Laundering & Reconditioning Service
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. PROCESSING FACILITY & CERTIFICATIONS */}
          <button
            onClick={() => handleLinkClick('facility')}
            className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer ${
              currentPage === 'facility' ? 'bg-orange-50 text-[#F15A24] border-l-4 border-[#F15A24]' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            PROCESSING FACILITY & CERTIFICATIONS
          </button>

          {/* 5. BLOG */}
          <button
            onClick={() => handleLinkClick('blog')}
            className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer ${
              currentPage === 'blog' || currentPage === 'blog-detail' ? 'bg-orange-50 text-[#F15A24] border-l-4 border-[#F15A24]' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            BLOG
          </button>

          {/* 6. CONTACT US */}
          <button
            onClick={() => handleLinkClick('contact')}
            className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'bg-orange-50 text-[#F15A24] border-l-4 border-[#F15A24]' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            CONTACT US
          </button>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuoteClick();
              }}
              className="w-full py-3 px-4 text-center font-bold text-xs uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] rounded-md shadow-sm cursor-pointer"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
