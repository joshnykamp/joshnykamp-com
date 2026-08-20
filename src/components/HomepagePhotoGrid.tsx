"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoLightbox } from "@/components/PhotoLightbox";

const PHOTO_WIDTH = 1800;
const PHOTO_HEIGHT = 1010;

const photos = [
  { src: "/images/homepage-1.jpg", alt: "Lone figure in a misty mountain forest", description: "Oaxaca, Mexico" },
  { src: "/images/homepage-2.jpg", alt: "Charles Bridge and Prague skyline at golden hour", description: "Prague, Czech Republic" },
  { src: "/images/homepage-3.jpg", alt: "Weathered rowboats on the green water of Lake Annecy", description: "Lake Annecy, France" },
  { src: "/images/homepage-4.jpg", alt: "Misty country road with stone wall in Kerry", description: "Kerry, Ireland" },
];

export function HomepagePhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(index)}
            className="aspect-[3/2] bg-stone-800 border border-stone-700 rounded-sm overflow-hidden group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      <PhotoLightbox
        slides={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />
    </>
  );
}
