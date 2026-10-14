import React from 'react';

interface ProductVisualProps {
  id: string;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ id, className = 'w-full h-48' }) => {
  switch (id) {
    case 'bestosia-otp':
      // Open Top Plain Barrel with removable lid and lever ring
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Top Lever Lock Ring */}
            <rect x="52" y="28" width="96" height="8" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="140" cy="32" r="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1" />
            <path d="M142 32 L150 34" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            
            {/* Drum Body */}
            <rect x="56" y="36" width="88" height="170" rx="3" fill="url(#otp-grad)" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* Rolling Hoops / Ribs */}
            <path d="M54 75 C 54 73, 146 73, 146 75 C 146 77, 54 77, 54 75 Z" fill="#1e293b" opacity="0.6" />
            <rect x="54" y="90" width="92" height="6" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <rect x="54" y="145" width="92" height="6" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            
            {/* Bottom Chime */}
            <rect x="54" y="204" width="92" height="6" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />

            {/* Spec Stamp */}
            <rect x="74" y="112" width="52" height="20" rx="2" fill="#1e293b" fillOpacity="0.8" />
            <text x="100" y="125" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">OTP · PLAIN</text>
            <text x="100" y="130" textAnchor="middle" fill="#94a3b8" fontSize="4.5" fontFamily="monospace">BESTOSIA® M.S.</text>

            <defs>
              <linearGradient id="otp-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
            Open-Head
          </div>
        </div>
      );

    case 'bestosia-otec':
      // Open Top Epoxy Coated (showing interior amber resin indication)
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-amber-50 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Open Top Cutaway view showing golden-amber epoxy phenolic lining */}
            <ellipse cx="100" cy="38" rx="46" ry="14" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
            <ellipse cx="100" cy="39" rx="42" ry="11" fill="url(#epoxy-inner-grad)" />
            <ellipse cx="100" cy="40" rx="36" ry="7" fill="#b45309" opacity="0.6" />
            
            {/* Outer Drum Wall */}
            <path d="M54 38 L54 206 C54 212 146 212 146 206 L146 38" fill="url(#otec-outer-grad)" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* Exterior Rolling Hoops */}
            <rect x="52" y="94" width="96" height="6" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <rect x="52" y="148" width="96" height="6" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            
            {/* Locking Band at Top rim */}
            <path d="M52 38 Q100 48 148 38" stroke="#1e293b" strokeWidth="3" fill="none" />
            
            {/* Bottom Chime */}
            <rect x="52" y="204" width="96" height="6" rx="2" fill="#1e293b" />

            {/* Epoxy Certification Badge Stamp */}
            <rect x="70" y="114" width="60" height="22" rx="3" fill="#78350f" fillOpacity="0.9" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="100" y="125" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold" fontFamily="monospace">EPOXY COATED</text>
            <text x="100" y="132" textAnchor="middle" fill="#fde68a" fontSize="5" fontFamily="monospace">CORROSION INERT</text>

            <defs>
              <linearGradient id="otec-outer-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="30%" stopColor="#334155" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="epoxy-inner-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-amber-700 text-white px-2 py-0.5 rounded">
            Epoxy Lined
          </div>
        </div>
      );

    case 'bestosia-cmp':
      // Close Mouth Plain Barrel with 2" and 3/4" Hex bungs
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Top Closed Head */}
            <ellipse cx="100" cy="36" rx="46" ry="12" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            
            {/* 2" Main Bung */}
            <ellipse cx="80" cy="35" r="5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
            <circle cx="80" cy="35" r="2.5" fill="#475569" />
            {/* 3/4" Vent Bung */}
            <ellipse cx="120" cy="37" r="3.5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
            <circle cx="120" cy="37" r="1.5" fill="#475569" />

            {/* Drum Body */}
            <path d="M54 36 L54 204 C54 210 146 210 146 204 L146 36" fill="url(#cmp-body-grad)" stroke="#0f172a" strokeWidth="1.5" />
            
            {/* Twin Heavy Rolling Hoops */}
            <rect x="52" y="88" width="96" height="7" rx="3.5" fill="#334155" stroke="#0f172a" strokeWidth="1" />
            <rect x="52" y="146" width="96" height="7" rx="3.5" fill="#334155" stroke="#0f172a" strokeWidth="1" />

            {/* Triple Seamed Chimes top & bottom */}
            <ellipse cx="100" cy="34" rx="47" ry="4" stroke="#0f172a" strokeWidth="2" fill="none" />
            <rect x="52" y="204" width="96" height="6" rx="2" fill="#0f172a" />

            {/* Spec Stamp */}
            <rect x="74" y="112" width="52" height="22" rx="2" fill="#0f172a" fillOpacity="0.85" />
            <text x="100" y="124" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">CMP · 210L</text>
            <text x="100" y="130" textAnchor="middle" fill="#38bdf8" fontSize="5" fontFamily="monospace">PRESSURE TESTED</text>

            <defs>
              <linearGradient id="cmp-body-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="35%" stopColor="#2563eb" />
                <stop offset="70%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-blue-900 text-white px-2 py-0.5 rounded">
            Tight-Head
          </div>
        </div>
      );

    case 'bestosia-gicm':
      // Galvanized Iron Close Mouth with zinc spangle look
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-200 to-slate-300 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Top G.I. Head */}
            <ellipse cx="100" cy="36" rx="46" ry="12" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
            {/* Bungs */}
            <ellipse cx="80" cy="35" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            <ellipse cx="120" cy="37" r="3.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />

            {/* Drum Body with zinc crystallite texture simulation */}
            <path d="M54 36 L54 204 C54 210 146 210 146 204 L146 36" fill="url(#gi-zinc-grad)" stroke="#64748b" strokeWidth="1.5" />
            
            {/* Crystalline Zinc Spangle Accents */}
            <polygon points="62,60 70,55 74,65 65,70" fill="#f8fafc" opacity="0.4" />
            <polygon points="120,68 132,62 135,74 125,78" fill="#ffffff" opacity="0.45" />
            <polygon points="80,105 92,98 96,110 82,112" fill="#ffffff" opacity="0.3" />
            <polygon points="110,130 124,122 128,136 114,138" fill="#f8fafc" opacity="0.4" />
            <polygon points="65,160 75,155 78,168 68,172" fill="#ffffff" opacity="0.35" />

            {/* Rolling Hoops */}
            <rect x="52" y="88" width="96" height="7" rx="3.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
            <rect x="52" y="146" width="96" height="7" rx="3.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
            <rect x="52" y="204" width="96" height="6" rx="2" fill="#64748b" />

            {/* GICM Stamp */}
            <rect x="70" y="112" width="60" height="22" rx="2" fill="#334155" fillOpacity="0.85" />
            <text x="100" y="124" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">GICM · ZINC</text>
            <text x="100" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="5" fontFamily="monospace">ESSENTIAL OILS</text>

            <defs>
              <linearGradient id="gi-zinc-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-slate-700 text-white px-2 py-0.5 rounded">
            Zinc Spangle
          </div>
        </div>
      );

    case 'bestosia-hdpec':
      // HDPE Close Mouth (Blue polymer, tare weight: 7.8 to 8.5 kg exact!)
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-sky-50 to-blue-100 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Molded HDPE Top with integrated bung recesses */}
            <ellipse cx="100" cy="38" rx="46" ry="12" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Dual bungs */}
            <ellipse cx="78" cy="37" rx="6" ry="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <ellipse cx="122" cy="37" rx="6" ry="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />

            {/* Seamless Blow-Molded Blue Body */}
            <path d="M54 38 C52 70 50 170 54 204 C54 212 146 212 146 204 C150 170 148 70 146 38 Z" fill="url(#hdpe-blue-grad)" stroke="#0369a1" strokeWidth="1.5" />
            
            {/* Blow molded chime rings and handling ribs */}
            <path d="M53 82 Q100 90 147 82" stroke="#0369a1" strokeWidth="2.5" fill="none" />
            <path d="M53 158 Q100 166 147 158" stroke="#0369a1" strokeWidth="2.5" fill="none" />
            <rect x="54" y="204" width="92" height="6" rx="3" fill="#0369a1" />

            {/* Tare Weight Exact Stamp */}
            <rect x="66" y="110" width="68" height="26" rx="3" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="0.8" />
            <text x="100" y="122" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">TARE WEIGHT</text>
            <text x="100" y="131" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">7.8 – 8.5 KG</text>

            <defs>
              <linearGradient id="hdpe-blue-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="35%" stopColor="#0284c7" />
                <stop offset="70%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-sky-700 text-white px-2 py-0.5 rounded">
            Tare 7.8-8.5 kg
          </div>
        </div>
      );

    case 'bestosia-ibc-max':
      // Bestosia IBC MAX - Export Optimized (20 units in 20ft container)
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-emerald-50 overflow-hidden ${className}`}>
          <svg viewBox="0 0 220 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Pallet Base */}
            <rect x="42" y="206" width="136" height="14" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1" />
            <rect x="50" y="212" width="22" height="8" fill="#0f172a" />
            <rect x="99" y="212" width="22" height="8" fill="#0f172a" />
            <rect x="148" y="212" width="22" height="8" fill="#0f172a" />

            {/* Inner Translucent HDPE Bottle */}
            <rect x="52" y="44" width="116" height="162" rx="10" fill="url(#ibc-bottle-grad)" stroke="#cbd5e1" strokeWidth="1" />
            {/* Top Cap */}
            <rect x="98" y="32" width="24" height="12" rx="3" fill="#0f172a" />
            {/* Bottom Drain Valve */}
            <rect x="100" y="194" width="20" height="12" rx="2" fill="#dc2626" />
            <circle cx="110" cy="200" r="3" fill="#ffffff" />

            {/* Galvanized Tubular Steel Cage - Vertical Bars */}
            <g stroke="#64748b" strokeWidth="2.5" opacity="0.9">
              <line x1="48" y1="42" x2="48" y2="206" />
              <line x1="72" y1="42" x2="72" y2="206" />
              <line x1="96" y1="42" x2="96" y2="206" />
              <line x1="124" y1="42" x2="124" y2="206" />
              <line x1="148" y1="42" x2="148" y2="206" />
              <line x1="172" y1="42" x2="172" y2="206" />
            </g>

            {/* Horizontal Grid Bars */}
            <g stroke="#475569" strokeWidth="2.5" opacity="0.9">
              <rect x="48" y="42" width="124" height="164" rx="6" fill="none" />
              <line x1="48" y1="78" x2="172" y2="78" />
              <line x1="48" y1="114" x2="172" y2="114" />
              <line x1="48" y1="150" x2="172" y2="150" />
              <line x1="48" y1="186" x2="172" y2="186" />
            </g>

            {/* Export Optimization Overlay Badge */}
            <rect x="62" y="124" width="96" height="30" rx="3" fill="#064e3b" fillOpacity="0.9" stroke="#10b981" strokeWidth="1" />
            <text x="110" y="137" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontWeight="bold" fontFamily="monospace">EXPORT FIT MAX</text>
            <text x="110" y="147" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">20 UNITS / 20FT FCL</text>

            <defs>
              <linearGradient id="ibc-bottle-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-emerald-800 text-white px-2 py-0.5 rounded">
            20 Units / 20ft
          </div>
        </div>
      );

    case 'bestosia-ibc-premium':
      // Bestosia IBC Premium - Highest-grade multi-stage cleaned
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-blue-50 overflow-hidden ${className}`}>
          <svg viewBox="0 0 220 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Pallet Base */}
            <rect x="42" y="206" width="136" height="14" rx="2" fill="#0f172a" stroke="#000000" strokeWidth="1" />
            <rect x="50" y="212" width="22" height="8" fill="#334155" />
            <rect x="99" y="212" width="22" height="8" fill="#334155" />
            <rect x="148" y="212" width="22" height="8" fill="#334155" />

            {/* Inner Pristine Bottle */}
            <rect x="52" y="44" width="116" height="162" rx="10" fill="url(#ibc-premium-grad)" stroke="#94a3b8" strokeWidth="1.2" />
            {/* Top Cap */}
            <rect x="96" y="32" width="28" height="12" rx="3" fill="#1e3a8a" />
            {/* Bottom Sealed Discharge Valve */}
            <rect x="100" y="194" width="20" height="12" rx="2" fill="#0284c7" />
            <circle cx="110" cy="200" r="3" fill="#ffffff" />

            {/* Precision Steel Grid */}
            <g stroke="#334155" strokeWidth="2.5">
              <line x1="48" y1="42" x2="48" y2="206" />
              <line x1="72" y1="42" x2="72" y2="206" />
              <line x1="96" y1="42" x2="96" y2="206" />
              <line x1="124" y1="42" x2="124" y2="206" />
              <line x1="148" y1="42" x2="148" y2="206" />
              <line x1="172" y1="42" x2="172" y2="206" />
              
              <rect x="48" y="42" width="124" height="164" rx="6" fill="none" />
              <line x1="48" y1="78" x2="172" y2="78" />
              <line x1="48" y1="114" x2="172" y2="114" />
              <line x1="48" y1="150" x2="172" y2="150" />
              <line x1="48" y1="186" x2="172" y2="186" />
            </g>

            {/* High-Grade Multi-Stage Seal Badge */}
            <rect x="60" y="122" width="100" height="32" rx="3" fill="#1e3a8a" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="1" />
            <text x="110" y="135" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">HIGH-GRADE TESTED</text>
            <text x="110" y="146" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">MULTI-STAGE CLEANED</text>

            <defs>
              <linearGradient id="ibc-premium-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-blue-900 text-white px-2 py-0.5 rounded">
            Multi-Stage Cleaned
          </div>
        </div>
      );

    case 'new-gi-barrels':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <ellipse cx="100" cy="36" rx="46" ry="12" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <ellipse cx="80" cy="35" r="5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <ellipse cx="120" cy="37" r="3.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <path d="M54 36 L54 204 C54 210 146 210 146 204 L146 36" fill="url(#new-gi-grad)" stroke="#475569" strokeWidth="1.5" />
            <rect x="52" y="88" width="96" height="7" rx="3.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            <rect x="52" y="146" width="96" height="7" rx="3.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            <rect x="52" y="204" width="96" height="6" rx="2" fill="#475569" />
            
            <rect x="66" y="112" width="68" height="22" rx="2" fill="#0f172a" fillOpacity="0.85" />
            <text x="100" y="124" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">NEW · VIRGIN G.I.</text>
            <text x="100" y="130" textAnchor="middle" fill="#38bdf8" fontSize="5" fontFamily="monospace">FACTORY PRIME</text>
            <defs>
              <linearGradient id="new-gi-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="35%" stopColor="#f8fafc" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-slate-800 text-white px-2 py-0.5 rounded">
            Brand-New G.I.
          </div>
        </div>
      );

    case 'new-ms-barrels':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <ellipse cx="100" cy="36" rx="46" ry="12" fill="#0f172a" stroke="#000000" strokeWidth="1.5" />
            <path d="M54 36 L54 204 C54 210 146 210 146 204 L146 36" fill="url(#new-ms-grad)" stroke="#000000" strokeWidth="1.5" />
            <rect x="52" y="88" width="96" height="7" rx="3.5" fill="#0f172a" stroke="#000000" strokeWidth="1" />
            <rect x="52" y="146" width="96" height="7" rx="3.5" fill="#0f172a" stroke="#000000" strokeWidth="1" />
            <rect x="52" y="204" width="96" height="6" rx="2" fill="#000000" />
            
            <rect x="66" y="112" width="68" height="22" rx="2" fill="#0f172a" fillOpacity="0.85" />
            <text x="100" y="124" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">NEW · M.S. PRIME</text>
            <text x="100" y="130" textAnchor="middle" fill="#60a5fa" fontSize="5" fontFamily="monospace">FACTORY FRESH</text>
            <defs>
              <linearGradient id="new-ms-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="35%" stopColor="#2563eb" />
                <stop offset="70%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-blue-950 text-white px-2 py-0.5 rounded">
            Brand-New M.S.
          </div>
        </div>
      );

    case 'new-ibc-totes':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 220 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <rect x="42" y="206" width="136" height="14" rx="2" fill="#0f172a" stroke="#000000" strokeWidth="1" />
            <rect x="52" y="44" width="116" height="162" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="98" y="32" width="24" height="12" rx="3" fill="#0f172a" />
            <rect x="100" y="194" width="20" height="12" rx="2" fill="#2563eb" />
            <g stroke="#334155" strokeWidth="2.5">
              <line x1="48" y1="42" x2="48" y2="206" />
              <line x1="72" y1="42" x2="72" y2="206" />
              <line x1="96" y1="42" x2="96" y2="206" />
              <line x1="124" y1="42" x2="124" y2="206" />
              <line x1="148" y1="42" x2="148" y2="206" />
              <line x1="172" y1="42" x2="172" y2="206" />
              <rect x="48" y="42" width="124" height="164" rx="6" fill="none" />
              <line x1="48" y1="78" x2="172" y2="78" />
              <line x1="48" y1="114" x2="172" y2="114" />
              <line x1="48" y1="150" x2="172" y2="150" />
              <line x1="48" y1="186" x2="172" y2="186" />
            </g>
            <rect x="66" y="122" width="88" height="26" rx="2" fill="#0f172a" fillOpacity="0.85" />
            <text x="110" y="134" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">NEW · 1000L IBC</text>
            <text x="110" y="143" textAnchor="middle" fill="#60a5fa" fontSize="5" fontFamily="monospace">VIRGIN HDPE BOTTLE</text>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
            Brand-New IBC
          </div>
        </div>
      );

    case 'legacy-carboys':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-sky-50 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <rect x="64" y="60" width="72" height="140" rx="10" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Top Handle */}
            <path d="M80 60 C80 40 120 40 120 60" stroke="#0369a1" strokeWidth="12" fill="none" strokeLinecap="round" />
            {/* Spout */}
            <rect x="110" y="40" width="18" height="20" rx="3" fill="#0f172a" />
            <rect x="60" y="188" width="80" height="8" rx="2" fill="#0369a1" />
            <rect x="76" y="116" width="48" height="20" rx="2" fill="#0f172a" fillOpacity="0.8" />
            <text x="100" y="129" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold" fontFamily="monospace">CARBOY 20–50L</text>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-sky-800 text-white px-2 py-0.5 rounded">
            HDPE Carboy
          </div>
        </div>
      );

    case 'legacy-plastic-drums':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-blue-50 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            {/* Open Top Ring */}
            <rect x="52" y="40" width="96" height="8" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="56" y="48" width="88" height="156" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <path d="M56 94 Q100 100 144 94" stroke="#0369a1" strokeWidth="2" fill="none" />
            <path d="M56 150 Q100 156 144 150" stroke="#0369a1" strokeWidth="2" fill="none" />
            <rect x="70" y="112" width="60" height="22" rx="2" fill="#0f172a" fillOpacity="0.8" />
            <text x="100" y="125" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold" fontFamily="monospace">OPEN TOP HDPE</text>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-blue-800 text-white px-2 py-0.5 rounded">
            Open-Head HDPE
          </div>
        </div>
      );

    case 'legacy-ibc-laundering':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-emerald-50 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 220 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <rect x="42" y="206" width="136" height="14" rx="2" fill="#1e293b" />
            <rect x="52" y="44" width="116" height="162" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <g stroke="#059669" strokeWidth="2.5" opacity="0.85">
              <line x1="48" y1="42" x2="48" y2="206" />
              <line x1="72" y1="42" x2="72" y2="206" />
              <line x1="96" y1="42" x2="96" y2="206" />
              <line x1="124" y1="42" x2="124" y2="206" />
              <line x1="148" y1="42" x2="148" y2="206" />
              <line x1="172" y1="42" x2="172" y2="206" />
              <rect x="48" y="42" width="124" height="164" rx="6" fill="none" />
              <line x1="48" y1="78" x2="172" y2="78" />
              <line x1="48" y1="114" x2="172" y2="114" />
              <line x1="48" y1="150" x2="172" y2="150" />
              <line x1="48" y1="186" x2="172" y2="186" />
            </g>
            <rect x="62" y="120" width="96" height="28" rx="2" fill="#064e3b" fillOpacity="0.9" />
            <text x="110" y="132" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="bold" fontFamily="monospace">IBC LAUNDERING</text>
            <text x="110" y="142" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">SCHÜTZ · KODAMA</text>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-emerald-800 text-white px-2 py-0.5 rounded">
            Laundering Service
          </div>
        </div>
      );

    case 'legacy-hmhdpe-drums':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-sky-50 to-slate-200 overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 240" className="h-full w-auto drop-shadow-md select-none" fill="none">
            <ellipse cx="100" cy="46" rx="40" ry="10" fill="#0369a1" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M60 46 L60 196 C60 204 140 204 140 196 L140 46" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <path d="M59 86 Q100 94 141 86" stroke="#0369a1" strokeWidth="2.5" fill="none" />
            <path d="M59 152 Q100 160 141 152" stroke="#0369a1" strokeWidth="2.5" fill="none" />
            <rect x="68" y="112" width="64" height="22" rx="2" fill="#0f172a" fillOpacity="0.8" />
            <text x="100" y="124" textAnchor="middle" fill="#f8fafc" fontSize="7.5" fontWeight="bold" fontFamily="monospace">30L · 50L · 100L</text>
            <text x="100" y="131" textAnchor="middle" fill="#38bdf8" fontSize="5" fontFamily="monospace">AS GOOD AS NEW</text>
          </svg>
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-sky-900 text-white px-2 py-0.5 rounded">
            30L–100L Drums
          </div>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-slate-100 text-slate-400 font-mono text-xs ${className}`}>
          Besto Container
        </div>
      );
  }
};
