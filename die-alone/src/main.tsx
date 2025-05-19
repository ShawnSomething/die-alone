import React, { useState } from "react";

export const Main = () => {
  const [upload, setUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

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
      <div className="h-screen flex items-center justify-center flex-col">
        {!preview && (
          <>
            <div
              className={`border-2 border-dashed rounded w-64 h-40 flex items-center justify-center flex-col transition ${
                isDraggingOver
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                const types = e.dataTransfer.types;
                if (
                  types.includes("Files") ||
                  types.find((t) => t.startsWith("text"))
                ) {
                  e.dataTransfer.dropEffect = "copy";
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragCounter((prev) => {
                  const next = prev + 1;
                  if (next === 1) setIsDraggingOver(true);
                  return next;
                });
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragCounter((prev) => {
                  const next = prev - 1;
                  if (next === 0) setIsDraggingOver(false);
                  return next;
                });
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragCounter(0);
                setIsDraggingOver(false);
                handleDrop(e);
              }}
            >
              <h1 className="flex justify-center text-3xl text-white">
                Upload here!
              </h1>
              <input type="file" className="mt-2" onChange={handleFileChange} />
            </div>
          </>
        )}
        {preview && (
          <>
            <button
              onClick={() => {
                if (preview) URL.revokeObjectURL(preview);
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
