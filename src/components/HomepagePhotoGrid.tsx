"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const photos = [1, 2, 3, 4].map((i) => ({
  src: `/images/homepage-${i}.jpg`,
  alt: `Photography ${i}`,
  width: 1800,
  height: 1010,
}));

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
        slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </>
  );
}
