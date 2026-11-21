import React, { useState } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
  darkCaption?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  caption,
  aspectClass = "aspect-[16/10]",
  className = "",
  priority = false,
  darkCaption = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`ugc-image-frame w-full ${aspectClass} bg-[#193747]/10`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#193747] to-[#0B1726] p-8 text-center text-white"
            role="img"
            aria-label={alt}
          >
            <span className="font-[var(--font-heading)] text-lg font-bold tracking-tight text-[#F56600]">
              UTAH GARAGE CLEAN
            </span>
            <span className="mt-2 max-w-md text-sm text-[#EEF1EF]/80">
              {alt}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-3 text-xs tracking-wide ${
            darkCaption ? "text-[#EEF1EF]/70" : "text-[#414B50]"
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
