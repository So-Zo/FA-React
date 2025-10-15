import { useState, useCallback } from "react";

interface UseFileUploadOptions {
  onUpload?: (file: File) => Promise<string | void>;
  onPreview?: (previewUrl: string) => void;
}

export function useFileUpload({
  onUpload,
  onPreview,
}: UseFileUploadOptions = {}) {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [uploadedMediaId, setUploadedMediaId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const previewUrl = event.target.result as string;
            setMediaPreview(previewUrl);
            onPreview?.(previewUrl);
          }
        };
        reader.readAsDataURL(file);

        // Handle upload if callback provided
        if (onUpload) {
          setIsUploading(true);
          try {
            const mediaId = await onUpload(file);
            if (mediaId && typeof mediaId === "string") {
              setUploadedMediaId(mediaId);
            }
          } catch (error) {
            console.error("File upload failed:", error);
          } finally {
            setIsUploading(false);
          }
        }
      }
    },
    [onUpload, onPreview]
  );

  const clearPreview = useCallback(() => {
    setMediaPreview(null);
    setUploadedMediaId(null);
    setSelectedFile(null);
    setIsUploading(false);
  }, []);

  return {
    mediaPreview,
    uploadedMediaId,
    selectedFile,
    isUploading,
    handleFileChange,
    clearPreview,
  };
}
