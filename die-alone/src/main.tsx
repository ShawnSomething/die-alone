import React, { useState } from "react";

export const Main = () => {
  const [upload, setUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const customImageUrl = e.dataTransfer.getData("custom-image");
    if (customImageUrl) {
      const res = await fetch(customImageUrl);
      const blob = await res.blob();
      const file = new File([blob], "example.jpg", { type: blob.type });

      setUpload(file);
      setPreview(URL.createObjectURL(file));
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div
        className={`h-screen flex items-center justify-center flex-col transition border-4 ${
          isDraggingOver ? "border-blue-400 bg-blue-50" : "border-transparent"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDraggingOver(true)}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
      >
        {!preview && (
          <>
            <h1 className="text-3xl">Upload here!</h1>
            <input type="file" onChange={handleFileChange} />
          </>
        )}
        {preview && (
          <>
            <button
              onClick={() => {
                if (preview) {
                  URL.revokeObjectURL(preview);
                }
                setUpload(null);
                setPreview(null);
              }}
              className="mb-4"
            >
              upload another
            </button>
            <img src={preview} className="max-w-xs" />
          </>
        )}
      </div>
    </>
  );
};
