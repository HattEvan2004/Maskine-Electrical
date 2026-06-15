import React, { useState } from 'react';
import { useSiteContent } from '../sanity/useSiteContent';
import { urlFor } from '../sanity/image';
import { X } from 'lucide-react';

export default function Gallery() {
  const site = useSiteContent();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const photos = site?.gallery || [];
  if (photos.length === 0) return null;

  const heading = site?.galleryHeading || 'Our Work';
  const subtitle = site?.gallerySubtitle || 'A look at recent projects and the team behind Maskine Electric.';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5" aria-hidden="true">
            <svg width="220" height="24" viewBox="0 0 220 24" fill="none" className="overflow-visible">
              <path d="M2 12 H70 L82 4 H138 L150 12 H218" stroke="#1e293b" strokeWidth="2" fill="none" />
              <path d="M2 12 H70 L82 4 H138 L150 12 H218" stroke="#fbbf24" strokeWidth="2" fill="none" className="circuit-flow" style={{filter:'drop-shadow(0 0 4px rgba(251,191,36,0.8))'}} />
              <circle cx="2" cy="12" r="3" fill="#fbbf24" className="circuit-node" />
              <circle cx="82" cy="4" r="3" fill="#fbbf24" className="circuit-node" />
              <circle cx="138" cy="4" r="3" fill="#fbbf24" className="circuit-node" />
              <circle cx="218" cy="12" r="3" fill="#fbbf24" className="circuit-node" />
            </svg>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {heading.split(/(Work)/).map((part, i) =>
              part === 'Work'
                ? <span key={i} className="glow-text text-amber-400">{part}</span>
                : part
            )}
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((photo: any, i: number) => {
            const full = urlFor(photo).width(1600).url();
            const thumb = urlFor(photo).width(1000).url();
            return (
              <button
                key={photo._key || i}
                onClick={() => setActiveImage(full)}
                className="group relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <img
                  src={thumb}
                  alt={photo.caption || 'Maskine Electric project'}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {photo.caption && (
                  <span className="absolute bottom-3 left-3 right-3 text-left text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.caption}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-5 right-5 text-white hover:text-amber-400"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={activeImage}
            alt="Maskine Electric project enlarged"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
