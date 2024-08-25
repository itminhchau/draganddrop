import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface SquareItemProps {
  id: string;
  color: string;
  width: number;
  height: number;
}

const SquareItem: React.FC<SquareItemProps> = ({
  id,
  color,
  width,
  height,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      id: id,
      color: color,
      width: width,
      height: height,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: 15,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <svg
        width={width}
        height={height}
        {...listeners}
        {...attributes}
        style={{ backgroundColor: color, cursor: "grab" }}
      >
        <g>
          <rect width={width} height={height} fill={color} />
          <text
            x="25" // Xác định tọa độ x của text
            y="25" // Xác định tọa độ y của text
            fontSize="12"
            textAnchor="middle"
            fill="white"
            dominantBaseline="middle"
            width={10}
            height={10}
          >
            <tspan x="25" dy="-0.4em">
              1
            </tspan>

            <tspan x="25" dy="1.2em">
              2
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default SquareItem;
