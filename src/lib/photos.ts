import type { Photo } from "@/types";

export const photos: Photo[] = [
  { id: 1,  src: "/images/gallery/gallery-1.jpg",  alt: "Stone bridge over a stream in an Alpine village",         tags: ["alps", "travel"],                        location: "French Alps" },
  { id: 2,  src: "/images/gallery/gallery-2.jpg",  alt: "Black and white Alpine village street with stone cross",  tags: ["alps", "travel", "black & white"],       location: "French Alps" },
  { id: 3,  src: "/images/gallery/gallery-3.jpg",  alt: "Medellín cityscape in morning mist",                      tags: ["colombia", "travel"],                    location: "Medellín, Colombia" },
  { id: 4,  src: "/images/gallery/gallery-4.jpg",  alt: "El Peñol rock rising above Guatapé",                      tags: ["colombia", "landscape"],                 location: "Guatapé, Colombia" },
  { id: 5,  src: "/images/gallery/gallery-5.jpg",  alt: "Aerial view of Guatapé reservoir and islands",            tags: ["colombia", "landscape"],                 location: "Guatapé, Colombia" },
  { id: 6,  src: "/images/gallery/gallery-6.jpg",  alt: "Lone figure in a misty mountain forest",                  tags: ["mexico", "landscape"],                   location: "Oaxaca, Mexico" },
  { id: 7,  src: "/images/gallery/gallery-7.jpg",  alt: "Coastal trail at golden hour sunset",                     tags: ["california", "landscape"],               location: "California" },
  { id: 8,  src: "/images/gallery/gallery-8.jpg",  alt: "Cliffs of Moher from the Atlantic, black and white",      tags: ["ireland", "landscape", "black & white"], location: "Cliffs of Moher, Ireland" },
  { id: 9,  src: "/images/gallery/gallery-9.jpg",  alt: "Cliffs of Moher under stormy skies, black and white",     tags: ["ireland", "landscape", "black & white"], location: "Cliffs of Moher, Ireland" },
  { id: 10, src: "/images/gallery/gallery-10.jpg", alt: "Charles Bridge and Prague skyline at golden hour",        tags: ["europe", "travel"],                      location: "Prague, Czech Republic" },
  { id: 11, src: "/images/gallery/gallery-11.jpg", alt: "Winter forest path in the Alps, black and white",         tags: ["alps", "landscape", "black & white"],    location: "Alps" },
  { id: 12, src: "/images/gallery/gallery-12.jpg", alt: "Weathered rowboats on the crystal green water of Lake Annecy", tags: ["alps", "travel"],                   location: "Lake Annecy, France" },
  { id: 14, src: "/images/gallery/gallery-14.jpg", alt: "Dark mossy forest tunnel path",                           tags: ["ireland", "landscape"],                  location: "Ireland" },
  { id: 15, src: "/images/gallery/gallery-15.jpg", alt: "Empty moorland road at dramatic golden light",            tags: ["ireland", "landscape"],                  location: "Ireland" },
  { id: 16, src: "/images/gallery/gallery-16.jpg", alt: "Wicklow Mountains valley with reservoir below",           tags: ["ireland", "landscape"],                  location: "Wicklow Mountains, Ireland" },
  { id: 17, src: "/images/gallery/gallery-17.jpg", alt: "Maynooth College chapel under a stormy yellow sky",       tags: ["ireland", "travel"],                     location: "Maynooth, Ireland" },
  { id: 18, src: "/images/gallery/gallery-18.jpg", alt: "Misty country road with stone wall in Kerry",             tags: ["ireland", "landscape"],                  location: "Kerry, Ireland" },
  { id: 19, src: "/images/gallery/gallery-19.jpg", alt: "Torc Waterfall cascading through Killarney forest",       tags: ["ireland", "landscape"],                  location: "Killarney, Ireland" },
  { id: 20, src: "/images/gallery/gallery-20.jpg", alt: "Ross Castle at dusk under a pink and purple sky",         tags: ["ireland", "travel"],                     location: "Killarney, Ireland" },
  { id: 21, src: "/images/gallery/gallery-21.jpg", alt: "Misty Irish lake and mountains, black and white",         tags: ["ireland", "landscape", "black & white"], location: "Ireland" },
];

export const ALL_TAG = "all";

export const photoTags = [
  ALL_TAG,
  ...Array.from(new Set(photos.flatMap((photo) => photo.tags))).sort(),
];
