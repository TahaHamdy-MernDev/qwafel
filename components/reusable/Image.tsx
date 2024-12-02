import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React from "react";

interface ImageProps {
  className?: string;
  src: string;
  width: number;
  height: number
  alt: string;
}

const Image: React.FC<ImageProps> = ({ className, src, width, height, alt }) => {
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
