import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import DropZone from "./components/DropZone";
import SquareItem from "./components/SquareItem";

const App: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<
    { id: string; x: number; y: number }[]
  >([]);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const snapDistance = 30;
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active, activatorEvent } = event;
    const activeElement = activatorEvent.target as HTMLElement;
    const dropZoneElement = dropZoneRef.current;

    if (over && over.id === "dropzone" && activeElement && dropZoneElement) {
      const itemRect = activeElement.getBoundingClientRect();
      const itemDropZone = dropZoneElement?.getBoundingClientRect();
      let x = itemRect.x - itemDropZone.x;
      let y = itemRect.y - itemDropZone.y;

      let snapped = false;

      // Kiểm tra khoảng cách với các hình vuông đã thả trước đó
      droppedItems.forEach((item) => {
        const itemLeft = item.x;
        const itemRight = item.x + 50;
        const itemTop = item.y;
        const itemBottom = item.y + 50;

        const newItemLeft = x;
        const newItemRight = x + 50;
        const newItemTop = y;
        const newItemBottom = y + 50;

        // Kiểm tra khoảng cách giữa các cạnh
        if (
          Math.abs(newItemLeft - itemRight) <= snapDistance &&
          ((newItemTop < itemBottom && newItemBottom > itemTop) ||
            (newItemBottom > itemTop && newItemTop < itemBottom))
        ) {
          // Snap vào cạnh phải
          x = itemRight;
          y = itemTop;
          snapped = true;
        }

        if (
          Math.abs(newItemRight - itemLeft) <= snapDistance &&
          ((newItemTop < itemBottom && newItemBottom > itemTop) ||
            (newItemBottom > itemTop && newItemTop < itemBottom))
        ) {
          // Snap vào cạnh trái
          x = itemLeft - 50;
          y = itemTop;
          snapped = true;
        }

        if (
          Math.abs(newItemTop - itemBottom) <= snapDistance &&
          ((newItemLeft < itemRight && newItemRight > itemLeft) ||
            (newItemRight > itemLeft && newItemLeft < itemRight))
        ) {
          // Snap vào cạnh dưới
          y = itemBottom;
          x = itemLeft;
          snapped = true;
        }

        if (
          Math.abs(newItemBottom - itemTop) <= snapDistance &&
          ((newItemLeft < itemRight && newItemRight > itemLeft) ||
            (newItemRight > itemLeft && newItemLeft < itemRight))
        ) {
          // Snap vào cạnh trên
          y = itemTop - 50;
          x = itemLeft;
          snapped = true;
        }
      });

      const id = active.id.toString();
      setDroppedItems((prev) => [...prev, { id, x, y }]);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div style={{ display: "flex", gap: "10px" }}>
        <SquareItem id="item-1" color="red" />
        <SquareItem id="item-2" color="blue" />
        <SquareItem id="item-3" color="green" />
        <SquareItem id="item-4" color="yellow" />
      </div>

      <div ref={dropZoneRef}>
        <DropZone>
          {droppedItems.map((item, index) => (
            <>
              <rect
                key={index}
                x={item.x}
                y={item.y}
                width="50"
                height="50"
                stroke="black"
                strokeWidth={2}
                fill={
                  item.id === "item-1"
                    ? "red"
                    : item.id === "item-2"
                    ? "blue"
                    : item.id === "item-3"
                    ? "green"
                    : "yellow"
                }
              />
              <text
                x={50 / 2 + item.x}
                y={50 / 2 + item.y}
                fontSize="12"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                1
              </text>
            </>
          ))}
        </DropZone>
      </div>

      <div>
        <h3>Dropped Items Coordinates:</h3>
        <ul>
          {droppedItems.map((item, index) => (
            <li key={index}>
              id: {item.id}, x: {item.x}, y: {item.y}
            </li>
          ))}
        </ul>
      </div>
    </DndContext>
  );
};

export default App;
