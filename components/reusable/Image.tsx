"use client";
import React, { useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  className?: string;
  src: string | undefined;
  width: number;
  height: number;
  alt: string;
}

const defaultFallbackImage = "/images/no-image.png";

const Image: React.FC<ImageProps> = ({
  className,
  src,
  width,
  height,
  alt,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(
    src && src !== "" ? src : defaultFallbackImage
  );

  const handleError = () => {
    setCurrentSrc(defaultFallbackImage);
  };

  return (
    <NextImage
      src={currentSrc}
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
