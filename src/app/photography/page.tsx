"use client";
import type { Photo } from "@/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const collections = [
  { id: "all", label: "All" },
  { id: "landscape", label: "Landscape" },
  { id: "travel", label: "Travel" },
];

const photos: Photo[] = [
  { id: 1,  src: "/images/gallery/gallery-1.jpg",  alt: "Photo 1",  collection: "landscape" },
  { id: 2,  src: "/images/gallery/gallery-2.jpg",  alt: "Photo 2",  collection: "landscape" },
  { id: 3,  src: "/images/gallery/gallery-3.jpg",  alt: "Photo 3",  collection: "landscape" },
  { id: 4,  src: "/images/gallery/gallery-4.jpg",  alt: "Photo 4",  collection: "landscape" },
  { id: 5,  src: "/images/gallery/gallery-5.jpg",  alt: "Photo 5",  collection: "landscape" },
  { id: 6,  src: "/images/gallery/gallery-6.jpg",  alt: "Photo 6",  collection: "landscape" },
  { id: 7,  src: "/images/gallery/gallery-7.jpg",  alt: "Photo 7",  collection: "landscape" },
  { id: 8,  src: "/images/gallery/gallery-8.jpg",  alt: "Photo 8",  collection: "landscape" },
  { id: 9,  src: "/images/gallery/gallery-9.jpg",  alt: "Photo 9",  collection: "landscape" },
  { id: 10, src: "/images/gallery/gallery-10.jpg", alt: "Photo 10", collection: "landscape" },
  { id: 11, src: "/images/gallery/gallery-11.jpg", alt: "Photo 11", collection: "landscape" },
  { id: 12, src: "/images/gallery/gallery-12.jpg", alt: "Photo 12", collection: "landscape" },
  { id: 14, src: "/images/gallery/gallery-14.jpg", alt: "Photo 14", collection: "landscape" },
  { id: 15, src: "/images/gallery/gallery-15.jpg", alt: "Photo 15", collection: "landscape" },
  { id: 16, src: "/images/gallery/gallery-16.jpg", alt: "Photo 16", collection: "landscape" },
  { id: 17, src: "/images/gallery/gallery-17.jpg", alt: "Photo 17", collection: "landscape" },
  { id: 18, src: "/images/gallery/gallery-18.jpg", alt: "Photo 18", collection: "landscape" },
  { id: 19, src: "/images/gallery/gallery-19.jpg", alt: "Photo 19", collection: "landscape" },
  { id: 20, src: "/images/gallery/gallery-20.jpg", alt: "Photo 20", collection: "landscape" },
  { id: 21, src: "/images/gallery/gallery-21.jpg", alt: "Photo 21", collection: "landscape" },
];

export default function PhotographyPage() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    activeCollection === "all"
      ? photos
      : photos.filter((p) => p.collection === activeCollection);

  return (
    <div className="py-20">
      <div className="container-content mb-12">
        <p className="label-mono mb-4">Photography</p>
        <h1 className="heading-display text-4xl md:text-6xl mb-6 max-w-2xl">
          Travel & landscape<br />
          <span className="text-gold">from the field.</span>
        </h1>
        <p className="text-stone-400 max-w-lg leading-relaxed">
          Amateur travel and landscape photography. Mostly wide open spaces,
          dramatic light, and places worth remembering.
        </p>
      </div>

      <div className="container-content mb-10">
        <div className="flex gap-2 flex-wrap">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCollection(c.id)}
              className={`px-4 py-1.5 text-sm font-mono border rounded-sm transition-colors ${
                activeCollection === c.id
                  ? "bg-gold text-stone-950 border-gold"
                  : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="container-content">
          <div className="columns-2 md:columns-3 gap-2 space-y-2">
            {filtered.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setLightboxIndex(i)}
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
      ) : (
        <div className="container-content">
          <div className="card p-20 text-center">
            <p className="label-mono text-stone-600 mb-2">Gallery coming soon</p>
            <p className="text-stone-500 text-sm">Add your photos to /public/images/photography</p>
          </div>
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </div>
  );
}
