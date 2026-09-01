"use client";
import { useState } from "react";
import { clsx } from "clsx";
import { ALL_TAG, photos, photoTags } from "@/lib/photos";
import { PhotoLightbox } from "@/components/PhotoLightbox";

export default function PhotographyPage() {
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const visiblePhotos =
    activeTag === ALL_TAG
      ? photos
      : photos.filter((photo) => photo.tags.includes(activeTag));

  return (
    <div className="py-20">
      <div className="container-content mb-12">
        <p className="label-mono mb-4">Photography</p>
        <h1 className="heading-display text-4xl md:text-6xl mb-6 max-w-2xl">
          Travel & landscape<br />
          <span className="text-gold">from the field.</span>
        </h1>
        <p className="text-stone-400 max-w-lg leading-relaxed">
          Amateur travel and landscape photography. I mostly shoot landscapes now but I still love Fashion and Street Photography. 
          I try to always carry a camera with me (Phone doesn't count). 
        </p>
      </div>

      <div className="container-content mb-10">
        <div className="flex gap-2 flex-wrap">
          {photoTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={clsx(
                "px-4 py-1.5 text-sm font-mono border rounded-sm transition-colors capitalize",
                activeTag === tag
                  ? "bg-gold text-stone-950 border-gold"
                  : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="container-content">
        <div className="columns-2 md:columns-3 gap-2 space-y-2">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="break-inside-avoid w-full overflow-hidden bg-stone-800 border border-stone-700 hover:border-stone-500 transition-colors group block"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      <PhotoLightbox
        slides={visiblePhotos.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
          description: photo.location,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />
    </div>
  );
}
