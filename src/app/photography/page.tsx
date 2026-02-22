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

const photos: Photo[] = [];

export default function PhotographyPage() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    activeCollection === "all"
      ? photos
      : photos.filter((p) => p.collection === activeCollection);

  return (
    <div className="py-20">
      {/* Header */}
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

      {/* Collection filter */}
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

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filtered.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setLightboxIndex(i)}
                className="aspect-square overflow-hidden bg-stone-800 border border-stone-700 hover:border-stone-500 transition-colors group"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </div>
  );
}
