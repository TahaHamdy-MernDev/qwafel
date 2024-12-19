"use client";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React, { useState } from "react";

interface ImageProps {
  className?: string;
  src: string | undefined;
  width: number;
  height: number;
  alt: string;
}

const defaultFallbackImage = "/images/broken.webp";

const Image: React.FC<ImageProps> = ({
  className,
  src,
  width,
  height,
  alt,
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(defaultFallbackImage);
  };

  return (
    <NextImage
      src={imageSrc ?? defaultFallbackImage}
      width={width}
      height={height}
      alt={alt}
      priority
      className={cn("h-auto w-auto", className)}
      onError={handleError}
    />
  );
};

export default Image;
