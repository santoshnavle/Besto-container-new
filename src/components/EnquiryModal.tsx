import React from 'react';
import { ProductItem } from '../types';
import { QuoteForm } from './QuoteForm';
import { X } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  product: ProductItem | null;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h2 id="enquiry-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              Commercial Quotation & Procurement
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {product ? `Preselected: ${product.name} (${product.fullName})` : 'Besto Container Industries · Palghar Facility'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <QuoteForm
            initialProductId={product?.id || ''}
            initialCategory={product?.category || 'all'}
            isCompact={true}
          />
        </div>
      </div>
    </div>
  );
};
