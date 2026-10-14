import React from 'react';
import { ProductItem } from '../types';
import { AdaptiveImage } from './AdaptiveImage';
import { X, Check, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onEnquire: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onEnquire,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500">
              <span className="font-bold text-[#F15A24]">{product.isBestosia ? 'BESTOSIA® Brand' : 'Brand-New Packaging'}</span>
              <span aria-hidden="true">·</span>
              <span>{product.subCategory}</span>
            </div>
            <h2 id="modal-product-title" className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {product.name} — {product.fullName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Visual Showcase */}
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <AdaptiveImage
              imageKey={product.id}
              aspectRatioClass="aspect-[16/10]"
              className="w-full h-72 sm:h-80 object-cover"
              showCaption={true}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
              Product Overview & Positioning
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
              Technical Specifications & Verifications
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-sm">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-200">
                  {product.specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="py-3 px-4 font-semibold text-slate-700 w-1/3">
                        {spec.label}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-900">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                  {product.closureType && (
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-700">Closure / Bung</td>
                      <td className="py-3 px-4 text-slate-900">{product.closureType}</td>
                    </tr>
                  )}
                  {product.surfaceFinish && (
                    <tr className="bg-white">
                      <td className="py-3 px-4 font-semibold text-slate-700">Internal Finish</td>
                      <td className="py-3 px-4 text-slate-900">{product.surfaceFinish}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Applications list */}
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
              Recommended Industrial Applications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.applications.map((app, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-700">
                  <Check size={16} className="text-[#F7941D] shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance notice */}
          <div className="bg-orange-50/70 border border-orange-200 rounded-lg p-4 text-sm text-slate-800 flex items-start gap-3">
            <ShieldCheck size={18} className="text-[#F15A24] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Processed under Maharashtra Pollution Control Board (MPCB) authorization and inspected in compliance with an ISO-certified Quality Management System.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/919833853196?text=${encodeURIComponent(`Hello Besto Container, I want to enquire about ${product.name} (${product.fullName}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onEnquire(product);
              }}
              className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Enquire for {product.name}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
