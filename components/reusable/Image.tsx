"use client";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React from "react";

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
  src = src && src !== "" ? src : defaultFallbackImage;
  return (
    <NextImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      priority
      className={cn("h-auto w-auto", className)}
    />
  );
};

export default Image;
