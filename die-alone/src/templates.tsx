import React, { useEffect, useState } from "react";
import myStupidFace from "./my-stupid-face.jpg";
import awkwardSeal from "./awkward-seal.jpg"

const images: string[] = [myStupidFace, awkwardSeal]

export const Template = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0)

  const handleOnMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        setPositionX(e.clientX);
        setPositionY(e.clientY);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setPositionX(0);
        setPositionY(150);
        setImageIndex((prev) => (prev + 1) % images.length)
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("custom-image", images[imageIndex])
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: positionX,
          top: positionY,
          transitionProperty: isDragging ? "none" : "left, top",
          transitionDuration: "300ms",
          transitionTimingFunction: "ease",
        }}
        className="duration-300 ease-in-out overflow-hidden w-32 h-auto"
      >
        <img
          src={images[imageIndex]}
          draggable
          onMouseDown={handleOnMouseDown}
          onDragStart={handleDragStart}
          className={isDragging ? "cursor-grabbing" : "cursor-grab"}
        />
      </div>
    </>
  );
};
