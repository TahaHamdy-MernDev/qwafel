"use client";

import { useEffect, useState } from "react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import "file-upload-with-preview/dist/style.css";

interface FileUploaderProps {
  name: string; // The name attribute for the file input
  multiple?: boolean; // Whether to allow multiple file uploads
}

const FileUploader = ({ name, multiple = false }: FileUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    const uploadInstance = new FileUploadWithPreview(name, {
      text: {
        chooseFile: "Choose files...",
        browse: "Browse",
        selectedCount: "files selected",
      },
      multiple,
    });

    const handleFileUpload = (event: CustomEvent) => {
      const files = uploadInstance.cachedFileArray;
      setUploadedFiles(files); // Update the state with uploaded files
      console.log("Uploaded files:", files);
    };

    // Listen to the file upload event
    document
      .querySelector(`[data-upload-id="${name}"]`)
      ?.addEventListener("fileUploadWithPreview:fileAdded", handleFileUpload);

    return () => {
      document
        .querySelector(`[data-upload-id="${name}"]`)
        ?.removeEventListener("fileUploadWithPreview:fileAdded", handleFileUpload);
    };
  }, [name, multiple]);

  return (
    <div
      className="custom-file-container bg-transparent"
      data-upload-id={name}
    ></div>
  );
};

export default FileUploader;
