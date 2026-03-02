"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const photos = [
  { src: "/images/homepage-1.jpg", alt: "Lone figure in a misty mountain forest",          description: "Oaxaca, Mexico",          width: 1800, height: 1010 },
  { src: "/images/homepage-2.jpg", alt: "Charles Bridge and Prague skyline at golden hour", description: "Prague, Czech Republic",   width: 1800, height: 1010 },
  { src: "/images/homepage-3.jpg", alt: "Weathered rowboats on the green water of Lake Annecy", description: "Lake Annecy, France", width: 1800, height: 1010 },
  { src: "/images/homepage-4.jpg", alt: "Misty country road with stone wall in Kerry",      description: "Kerry, Ireland",          width: 1800, height: 1010 },
];

export default function HomepagePhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-[3/2] bg-stone-800 border border-stone-700 rounded-sm overflow-hidden group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt, description: p.description }))}
        plugins={[Captions]}
      />
    </>
  );
}
