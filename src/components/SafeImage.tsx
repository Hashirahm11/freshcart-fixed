import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'FreshCart grocery item'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2F9F3] to-[#E0F2E3] text-[#0F3D24] p-3 text-center ${className}`}
      >
        <Leaf className="w-6 h-6 text-[#22993D] mb-1.5" aria-hidden="true" />
        <span className="text-xs font-medium leading-tight line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={rest.loading || 'lazy'}
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-85'} ${className}`}
      {...rest}
    />
  );
};
