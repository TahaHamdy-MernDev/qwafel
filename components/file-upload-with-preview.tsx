"use client";

import { useEffect, useRef, useState } from "react";
import { Images } from "lucide-react";
import Image from "./reusable/Image";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  multiple?: boolean;
  max?: number;
  className?: string;
  onFileChange: (files: File[]) => void;
  defaultImage?: string | string[];
}

const ImageUploader = ({
  onFileChange,
  multiple = true,
  className,
  defaultImage,
  max = 10,
}: ImageUploaderProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [defaultImages, setDefaultImages] = useState<string[]>(
    Array.isArray(defaultImage)
      ? defaultImage
      : defaultImage
      ? [defaultImage]
      : []
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Update default images when the prop changes
    setDefaultImages(
      Array.isArray(defaultImage)
        ? defaultImage
        : defaultImage
        ? [defaultImage]
        : []
    );
  }, [defaultImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = [...uploadedImages, ...newFiles];
      if (totalFiles.length + defaultImages.length <= max) {
        setUploadedImages(totalFiles);
        onFileChange(totalFiles);
      } else {
        alert(`You can only upload a maximum of ${max} images.`);
      }
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    onFileChange(updatedImages);
    // Reset the input value when removing an image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveDefaultImage = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedDefaultImages = defaultImages.filter((_, i) => i !== index);
    setDefaultImages(updatedDefaultImages);
  };

  const openFilePicker = (event: React.MouseEvent) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset before opening
      fileInputRef.current.click();
    }
  };

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileUpload}
        className="hidden"
      />

      <div
        className={cn(
          "cursor-pointer flex justify-start items-start max-w-lg min-h-[15rem] p-4 border border-primary rounded-lg bg-transparent transition",
          className
        )}
      >
        {uploadedImages.length === 0 && defaultImages.length === 0 ? (
          <button
            type="button"
            onClick={openFilePicker}
            className="flex flex-col items-center justify-center text-gray-500 w-full min-h-[10rem]"
          >
            <Images className="w-12 h-12 mb-2" />
            <p>Click to upload images</p>
          </button>
        ) : (
          <div className="p-2 grid grid-cols-4 gap-4">
            {defaultImages.map((src, index) => (
              <div key={`${src}-${index}`} className="relative group">
                <Image
                  width={140}
                  height={140}
                  src={src}
                  alt="Default preview"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={(event) => handleRemoveDefaultImage(event, index)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            {uploadedImages.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <Image
                  width={140}
                  height={140}
                  src={URL.createObjectURL(file)}
                  alt="Uploaded preview"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={(event) => handleRemoveImage(event, index)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            {uploadedImages.length + defaultImages.length < max && (
              <button
                type="button"
                onClick={openFilePicker}
                className="cursor-pointer p-4 border-2 border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Images className="w-12 h-12 mb-2" />
                  <p>Add more</p>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
