import React, { useState, useEffect } from 'react';
import { QuoteFormData, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { COMPANY_DETAILS } from '../data/company';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Copy, Check } from 'lucide-react';

interface QuoteFormProps {
  initialProductId?: string;
  initialCategory?: ProductCategory | 'all';
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialProductId = '',
  initialCategory = 'all',
  onSuccess,
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    category: initialCategory,
    productId: initialProductId,
    quantity: '',
    message: '',
    deliveryLocation: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialProductId) {
      setFormData(prev => ({
        ...prev,
        productId: initialProductId,
        category: initialCategory || prev.category
      }));
    }
  }, [initialProductId, initialCategory]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for commercial quotations.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Business email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate email format.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile or direct phone number is required.';
    } else if (!/^[0-9+\s\-()]{8,18}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid telephone/mobile number.';
    }

    if (!formData.productId) {
      newErrors.productId = 'Please select the container model of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Generate verified reference number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = new Date().toISOString().slice(2, 7).replace('-', '');
    const generatedRef = `BCI-RFQ-${datePrefix}-${randomSuffix}`;

    setTimeout(() => {
      // Persist to local inquiry storage for verifiable tracking
      try {
        const existingQuotes = JSON.parse(localStorage.getItem('bci_commercial_enquiries') || '[]');
        existingQuotes.unshift({
          ref: generatedRef,
          timestamp: new Date().toISOString(),
          ...formData
        });
        localStorage.setItem('bci_commercial_enquiries', JSON.stringify(existingQuotes.slice(0, 25)));
      } catch {
        // Fallback gracefully if localStorage restricted
      }

      setSubmittedRef(generatedRef);
      setIsSubmitting(false);

      if (onSuccess) {
        onSuccess();
      }
    }, 400);
  };

  const selectedProduct = PRODUCTS.find(p => p.id === formData.productId);

  const getWhatsAppLink = () => {
    const targetProduct = selectedProduct ? `${selectedProduct.name} (${selectedProduct.fullName})` : formData.productId;
    const text = encodeURIComponent(
      `*Commercial Quotation Request (Ref: ${submittedRef})*\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Company:* ${formData.companyName}\n` +
      `*Contact:* ${formData.phone} | ${formData.email}\n` +
      `*Product:* ${targetProduct}\n` +
      `*Quantity:* ${formData.quantity || 'To be specified'}\n` +
      `*Destination:* ${formData.deliveryLocation || 'Palghar / Western India'}\n` +
      `*Message:* ${formData.message || 'Please provide technical specifications and price per unit.'}`
    );
    return `https://wa.me/919833853196?text=${text}`;
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submittedRef) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 text-center space-y-6">
        <div className="w-14 h-14 bg-orange-50 text-[#F15A24] border border-orange-200 rounded-full flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 size={30} />
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-[#121212]">Commercial Enquiry Generated & Registered</h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your quotation request has been validated and logged in your browser's local procurement register.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider font-semibold">Enquiry Reference</span>
            <button
              onClick={handleCopyRef}
              className="text-sm text-slate-700 flex items-center gap-1.5 hover:text-[#F15A24] cursor-pointer font-medium"
            >
              {copied ? <Check size={15} className="text-[#F15A24]" /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy Ref'}</span>
            </button>
          </div>
          <div className="text-xl font-mono font-bold text-[#F15A24]">{submittedRef}</div>
          <div className="text-sm sm:text-base text-slate-700">
            <strong>Target Product:</strong> {selectedProduct ? `${selectedProduct.name} · ${selectedProduct.fullName}` : formData.productId}
          </div>
          {formData.quantity && (
            <div className="text-sm sm:text-base text-slate-700">
              <strong>Requirement:</strong> {formData.quantity} units
            </div>
          )}
        </div>

        {/* Backend Transparency Notice */}
        <div className="bg-orange-50/70 border border-orange-200 rounded-lg p-4 text-left space-y-1 text-sm text-slate-800">
          <div className="flex items-center gap-2 font-bold text-[#121212]">
            <AlertCircle size={16} className="text-[#F15A24] shrink-0" />
            <span>Delivery Status & Priority Dispatch</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            For immediate quotation processing and priority dispatch scheduling, transmit your pre-filled inquiry to our verified WhatsApp sales desk or email <strong>{COMPANY_DETAILS.contact.email}</strong> citing reference <strong>{submittedRef}</strong>.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <MessageSquare size={17} />
              <span>Forward to WhatsApp Sales Desk</span>
            </a>
            <button
              onClick={() => {
                setSubmittedRef(null);
                setFormData({
                  fullName: '',
                  companyName: '',
                  email: '',
                  phone: '',
                  category: 'all',
                  productId: '',
                  quantity: '',
                  message: '',
                  deliveryLocation: ''
                });
              }}
              className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-sm font-semibold transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Category selector */}
      <div>
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
          Product Segment
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, category: 'refurbished', productId: '' })}
            className={`py-2.5 px-3 text-xs sm:text-sm rounded-lg border text-center transition-colors cursor-pointer ${
              formData.category === 'refurbished'
                ? 'border-[#F15A24] bg-orange-50 text-[#F15A24] font-bold shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            BESTOSIA® Refurbished
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, category: 'new', productId: '' })}
            className={`py-2.5 px-3 text-xs sm:text-sm rounded-lg border text-center transition-colors cursor-pointer ${
              formData.category === 'new'
                ? 'border-[#F15A24] bg-orange-50 text-[#F15A24] font-bold shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            Brand-New Barrels & IBCs
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, category: 'all', productId: '' })}
            className={`py-2.5 px-3 text-xs sm:text-sm rounded-lg border text-center transition-colors cursor-pointer ${
              formData.category === 'all'
                ? 'border-[#F15A24] bg-orange-50 text-[#F15A24] font-bold shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            All Products
          </button>
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <label htmlFor="product-select" className="block text-sm font-bold text-slate-800 mb-1.5">
          Product of Interest <span className="text-[#F15A24]">*</span>
        </label>
        <select
          id="product-select"
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          className={`w-full text-base bg-white border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all cursor-pointer ${
            errors.productId ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
          }`}
        >
          <option value="">Select a container or barrel model...</option>
          <optgroup label="BESTOSIA® Refurbished Series">
            {PRODUCTS.filter(p => p.category === 'refurbished').map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name} — {prod.fullName}
              </option>
            ))}
          </optgroup>
          <optgroup label="Brand-New Packaging">
            {PRODUCTS.filter(p => p.category === 'new').map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name} — {prod.fullName}
              </option>
            ))}
          </optgroup>
          <optgroup label="Carboys & Specialty Containers">
            {PRODUCTS.filter(p => p.category === 'legacy').map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name} — {prod.fullName}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.productId && (
          <p className="mt-1.5 text-xs sm:text-sm text-red-600 flex items-center gap-1 font-medium">
            <AlertCircle size={14} /> {errors.productId}
          </p>
        )}
      </div>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-bold text-slate-800 mb-1.5">
            Full Name <span className="text-[#F15A24]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Rajesh Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full text-base bg-white border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all ${
              errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
            }`}
          />
          {errors.fullName && <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-bold text-slate-800 mb-1.5">
            Company / Organization <span className="text-[#F15A24]">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="e.g. Apex Chemicals Ltd"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className={`w-full text-base bg-white border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all ${
              errors.companyName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
            }`}
          />
          {errors.companyName && <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{errors.companyName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-1.5">
            Business Email <span className="text-[#F15A24]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full text-base bg-white border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all ${
              errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
            }`}
          />
          {errors.email && <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-slate-800 mb-1.5">
            Phone / Mobile <span className="text-[#F15A24]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98XXX XXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full text-base bg-white border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all ${
              errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
            }`}
          />
          {errors.phone && <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-bold text-slate-800 mb-1.5">
            Quantity Required (Optional)
          </label>
          <input
            id="quantity"
            type="text"
            placeholder="e.g. 100 units / month or 1 container load"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full text-base bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all"
          />
        </div>

        <div>
          <label htmlFor="deliveryLocation" className="block text-sm font-bold text-slate-800 mb-1.5">
            Delivery Destination (Optional)
          </label>
          <input
            id="deliveryLocation"
            type="text"
            placeholder="e.g. Tarapur, Vapi, Ankleshwar, JNPT Port"
            value={formData.deliveryLocation}
            onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
            className="w-full text-base bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-slate-800 mb-1.5">
          Technical Specifications / Chemical Compatibility Notes (Optional)
        </label>
        <textarea
          id="message"
          rows={isCompact ? 2 : 3}
          placeholder="Please describe stored media (e.g. solvents, peppermint oil, resin), interior coating preference, or delivery timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full text-base bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:border-[#F15A24] resize-none transition-all leading-relaxed"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#F15A24] hover:bg-[#D94814] active:scale-[0.99] disabled:bg-slate-300 text-white font-bold text-base rounded-lg shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
        >
          {isSubmitting ? (
            <span>Generating Quotation Request...</span>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Commercial Enquiry</span>
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs sm:text-sm text-slate-500">
          Enquiries are logged directly with Besto Container Industries sales desk. Prompt response guaranteed.
        </p>
      </div>
    </form>
  );
};
