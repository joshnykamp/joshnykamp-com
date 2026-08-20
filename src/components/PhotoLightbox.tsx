"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export interface LightboxSlide {
  src: string;
  alt: string;
  description?: string;
}

interface PhotoLightboxProps {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
}

export function PhotoLightbox({ slides, index, onClose }: PhotoLightboxProps) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Captions]}
    />
  );
}
