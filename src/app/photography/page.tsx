"use client";
import type { Photo } from "@/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const photos: Photo[] = [
  { id: 1,  src: "/images/gallery/gallery-1.jpg",  alt: "Stone bridge over a stream in an Alpine village",         tags: ["alps", "travel"],                        location: "French Alps" },
  { id: 2,  src: "/images/gallery/gallery-2.jpg",  alt: "Black and white Alpine village street with stone cross",  tags: ["alps", "travel", "black & white"],        location: "French Alps" },
  { id: 3,  src: "/images/gallery/gallery-3.jpg",  alt: "Medellín cityscape in morning mist",                     tags: ["colombia", "travel"],                    location: "Medellín, Colombia" },
  { id: 4,  src: "/images/gallery/gallery-4.jpg",  alt: "El Peñol rock rising above Guatapé",                     tags: ["colombia", "landscape"],                 location: "Guatapé, Colombia" },
  { id: 5,  src: "/images/gallery/gallery-5.jpg",  alt: "Aerial view of Guatapé reservoir and islands",           tags: ["colombia", "landscape"],                 location: "Guatapé, Colombia" },
  { id: 6,  src: "/images/gallery/gallery-6.jpg",  alt: "Lone figure in a misty mountain forest",                 tags: ["mexico", "landscape"],                   location: "Oaxaca, Mexico" },
  { id: 7,  src: "/images/gallery/gallery-7.jpg",  alt: "Coastal trail at golden hour sunset",                    tags: ["california", "landscape"],               location: "California" },
  { id: 8,  src: "/images/gallery/gallery-8.jpg",  alt: "Cliffs of Moher from the Atlantic, black and white",     tags: ["ireland", "landscape", "black & white"], location: "Cliffs of Moher, Ireland" },
  { id: 9,  src: "/images/gallery/gallery-9.jpg",  alt: "Cliffs of Moher under stormy skies, black and white",    tags: ["ireland", "landscape", "black & white"], location: "Cliffs of Moher, Ireland" },
  { id: 10, src: "/images/gallery/gallery-10.jpg", alt: "Charles Bridge and Prague skyline at golden hour",        tags: ["europe", "travel"],                      location: "Prague, Czech Republic" },
  { id: 11, src: "/images/gallery/gallery-11.jpg", alt: "Winter forest path in the Alps, black and white",        tags: ["alps", "landscape", "black & white"],    location: "Alps" },
  { id: 12, src: "/images/gallery/gallery-12.jpg", alt: "Weathered rowboats on the crystal green water of Lake Annecy", tags: ["alps", "travel"],                  location: "Lake Annecy, France" },
  { id: 14, src: "/images/gallery/gallery-14.jpg", alt: "Dark mossy forest tunnel path",                          tags: ["ireland", "landscape"],                  location: "Ireland" },
  { id: 15, src: "/images/gallery/gallery-15.jpg", alt: "Empty moorland road at dramatic golden light",           tags: ["ireland", "landscape"],                  location: "Ireland" },
  { id: 16, src: "/images/gallery/gallery-16.jpg", alt: "Wicklow Mountains valley with reservoir below",          tags: ["ireland", "landscape"],                  location: "Wicklow Mountains, Ireland" },
  { id: 17, src: "/images/gallery/gallery-17.jpg", alt: "Maynooth College chapel under a stormy yellow sky",      tags: ["ireland", "travel"],                     location: "Maynooth, Ireland" },
  { id: 18, src: "/images/gallery/gallery-18.jpg", alt: "Misty country road with stone wall in Kerry",            tags: ["ireland", "landscape"],                  location: "Kerry, Ireland" },
  { id: 19, src: "/images/gallery/gallery-19.jpg", alt: "Torc Waterfall cascading through Killarney forest",      tags: ["ireland", "landscape"],                  location: "Killarney, Ireland" },
  { id: 20, src: "/images/gallery/gallery-20.jpg", alt: "Ross Castle at dusk under a pink and purple sky",        tags: ["ireland", "travel"],                     location: "Killarney, Ireland" },
  { id: 21, src: "/images/gallery/gallery-21.jpg", alt: "Misty Irish lake and mountains, black and white",        tags: ["ireland", "landscape", "black & white"], location: "Ireland" },
];

const allTags = ["all", ...Array.from(new Set(photos.flatMap((p) => p.tags))).sort()];

export default function PhotographyPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    activeTag === "all"
      ? photos
      : photos.filter((p) => p.tags.includes(activeTag));

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

      {allTags.length > 1 && (
        <div className="container-content mb-10">
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 text-sm font-mono border rounded-sm transition-colors capitalize ${
                  activeTag === tag
                    ? "bg-gold text-stone-950 border-gold"
                    : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

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
        slides={filtered.map((p) => ({ src: p.src, alt: p.alt, description: p.location }))}
        plugins={[Captions]}
      />
    </div>
  );
}
