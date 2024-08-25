import React, { HtmlHTMLAttributes } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableSquareProps {
  id: string;
}

const DraggableSquare: React.FC<
  DraggableSquareProps & HtmlHTMLAttributes<HTMLDivElement>
> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    zIndex: 10,
  };

  return (
    <svg
      width="50"
      height="50"
      ref={setNodeRef as React.LegacyRef<SVGSVGElement>}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </svg>
  );
};

export default DraggableSquare;
