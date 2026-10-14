import React, { useState } from 'react';

interface BestoLogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
  variant?: 'light' | 'on-dark';
  showBreathingSpace?: boolean;
}

export const BestoLogo: React.FC<BestoLogoProps> = ({
  className = '',
  imgClassName = 'h-12 sm:h-14 md:h-16 w-auto max-h-16 max-w-full object-contain',
  alt = 'Besto Container Industries Logo',
  variant = 'light',
  showBreathingSpace = true,
}) => {
  const [imgSrc, setImgSrc] = useState('/images/logo.png');
  const [imgFailed, setImgFailed] = useState(false);

  // Handle fallback paths (/images/logo.png -> /logo.png)
  const handleError = () => {
    if (imgSrc === '/images/logo.png') {
      setImgSrc('/logo.png');
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${
        showBreathingSpace ? 'p-1.5 sm:p-2' : ''
      } ${
        variant === 'on-dark'
          ? 'bg-white/95 rounded-lg shadow-xs'
          : ''
      } ${className}`}
    >
      {!imgFailed ? (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          className={`${imgClassName} transition-transform duration-200 group-hover:scale-102`}
          loading="eager"
        />
      ) : (
        /* Graceful indicator when PNG asset is awaiting user upload */
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-orange-50/80 border border-orange-200 text-[#F15A24] text-xs font-semibold">
          <span>Besto Container Industries</span>
        </div>
      )}
    </div>
  );
};
