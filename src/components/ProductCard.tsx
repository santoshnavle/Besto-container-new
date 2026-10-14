import React from 'react';
import { ProductItem } from '../types';
import { AdaptiveImage } from './AdaptiveImage';
import { ArrowRight, Check, FileText } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onEnquire: (product: ProductItem) => void;
  onViewDetails: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEnquire,
  onViewDetails,
}) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-[#F15A24]/60 group">
      {/* Visual Header */}
      <div 
        className="relative cursor-pointer overflow-hidden" 
        onClick={() => onViewDetails(product)}
      >
        <AdaptiveImage
          imageKey={product.id}
          aspectRatioClass="aspect-[4/3]"
          className="w-full h-56 sm:h-60 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        
        {/* Badge with dark base and brand orange accent */}
        {product.highlightBadge && (
          <div className="absolute bottom-3 left-3 bg-[#121212]/95 text-white text-xs font-semibold px-3 py-1 rounded-md tracking-wide backdrop-blur-xs border-l-3 border-[#F15A24] shadow-sm">
            {product.highlightBadge}
          </div>
        )}
      </div>

      {/* Content Body with increased font sizes */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
            <span className="text-[#F15A24] font-bold">{product.isBestosia ? 'BESTOSIA®' : 'NEW'}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">{product.subCategory || 'Industrial Container'}</span>
            {product.tareWeight && (
              <>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-slate-900 font-semibold">{product.tareWeight}</span>
              </>
            )}
          </div>

          <div>
            <h3 
              onClick={() => onViewDetails(product)}
              className="text-xl font-bold text-[#121212] leading-snug group-hover:text-[#F15A24] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {product.fullName}
            </p>
          </div>

          {/* Description with readable text-sm (14px) and 1.6 line height */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Key Applications Preview */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Key Applications:
            </span>
            <ul className="space-y-1.5">
              {product.applications.slice(0, 2).map((app, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                  <Check size={15} className="text-[#F7941D] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Controls - Clear primary action & avoid repeating "Request Quote" on every card */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-orange-50 hover:text-[#F15A24] hover:border-orange-200 border border-slate-200 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            title={`View full specifications for ${product.name}`}
          >
            <FileText size={15} />
            <span>View Specs</span>
          </button>
          
          <button
            onClick={() => onEnquire(product)}
            className="py-2.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-md transition-colors text-center whitespace-nowrap shadow-2xs cursor-pointer flex items-center gap-1"
          >
            <span>Enquire</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
