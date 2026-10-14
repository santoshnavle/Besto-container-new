import React, { useState } from 'react';
import { SITE_IMAGES } from '../data/images';
import { ProductVisual } from './ProductVisual';
import { Info, Image as ImageIcon } from 'lucide-react';

interface AdaptiveImageProps {
  imageKey: string;
  className?: string;
  showCaption?: boolean;
  priority?: boolean;
  aspectRatioClass?: string;
}

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  imageKey,
  className = 'w-full h-full object-cover',
  showCaption = false,
  priority = false,
  aspectRatioClass = 'aspect-[4/3]',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const imageMeta = SITE_IMAGES[imageKey];

  if (!imageMeta || hasError) {
    // Graceful, polished SVG technical fallback if image is missing or fails
    return (
      <div className={`relative w-full ${aspectRatioClass} bg-slate-100 overflow-hidden`}>
        <ProductVisual id={imageKey} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} bg-slate-100 overflow-hidden group`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <ImageIcon size={24} className="text-slate-400" />
        </div>
      )}

      {/* Main Photographic Asset */}
      <img
        src={imageMeta.url}
        alt={imageMeta.alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Representative Image Badge (Clearly distinguishes stock from authentic) */}
      {imageMeta.isRepresentative && isLoaded && (
        <div className="absolute top-2 left-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowInfoModal(!showInfoModal);
            }}
            className="flex items-center gap-1 py-0.5 px-2 text-[10px] font-mono tracking-wider bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white rounded backdrop-blur-xs transition-colors"
            title="Representative industrial photograph. Click for upload details."
          >
            <span>Representative Photo</span>
            <Info size={11} className="text-slate-400" />
          </button>

          {/* Quick Info Popover */}
          {showInfoModal && (
            <div 
              className="absolute top-7 left-0 w-64 bg-slate-900 text-white text-[11px] p-3 rounded shadow-xl border border-slate-700 z-20 space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-bold text-sky-400">Representative Imagery Notice</div>
              <p className="text-slate-300 leading-snug">
                This image is licensed representative industrial photography.
              </p>
              <p className="text-slate-400 font-mono text-[10px] pt-1 border-t border-slate-800">
                To show authentic facility photo, save as: <br />
                <span className="text-emerald-400">{imageMeta.localPath}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Optional Editorial Caption */}
      {showCaption && isLoaded && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-3 pt-6 text-[11px] text-slate-200">
          <p className="line-clamp-2 leading-relaxed">{imageMeta.caption}</p>
        </div>
      )}
    </div>
  );
};
