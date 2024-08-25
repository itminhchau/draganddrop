import React, { HtmlHTMLAttributes } from "react";
import { useDroppable } from "@dnd-kit/core";

const DropZone: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "dropzone",
  });

  return (
    <svg
      ref={setNodeRef as React.RefCallback<SVGSVGElement>}
      width="400"
      height="400"
      style={{
        border: "2px dashed #000",
        position: "relative",

        overflow: "visible", // Đảm bảo các item không bị cắt bởi vùng thả
        zIndex: 5,
      }}
    >
      {children}
      {isOver && (
        <text x="50%" y="50%" textAnchor="middle" fill="black">
          Drop here
        </text>
      )}
    </svg>
  );
};

export default DropZone;
