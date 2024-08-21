import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface SquareItemProps {
  id: string;
  color: string;
}

const SquareItem: React.FC<SquareItemProps> = ({ id, color }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style}>
      <svg
        width="50"
        height="50"
        {...listeners}
        {...attributes}
        style={{ backgroundColor: color, cursor: "grab" }}
      >
        <rect width="50" height="50" fill={color} />
      </svg>
    </div>
  );
};

export default SquareItem;
