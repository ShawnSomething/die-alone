import React, { useState } from "react";

export const Main = () => {
  const [upload, setUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
