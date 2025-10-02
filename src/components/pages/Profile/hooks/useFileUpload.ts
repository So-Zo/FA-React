import { useState, useCallback } from "react";

interface UseFileUploadOptions {
  onUpload?: (file: File) => void;
  onPreview?: (previewUrl: string) => void;
}

export function useFileUpload({
  onUpload,
  onPreview,
}: UseFileUploadOptions = {}) {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const previewUrl = event.target.result as string;
            setMediaPreview(previewUrl);
            onPreview?.(previewUrl);
          }
        };
        reader.readAsDataURL(file);
        onUpload?.(file);
      }
    },
    [onUpload, onPreview]
  );

  const clearPreview = useCallback(() => {
    setMediaPreview(null);
  }, []);

  return {
    mediaPreview,
    handleFileChange,
    clearPreview,
  };
}
