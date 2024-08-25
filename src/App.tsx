import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import DropZone from "./components/DropZone";
import SquareItem from "./components/SquareItem";
import DraggableSquare from "./components/DraggableSquare";

const App: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<
    { id: string; x: number; y: number; width: number; height: number }[]
  >([]);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const snapDistance = 30;
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active, activatorEvent } = event;
    const { width, height } = active.data.current;
    const activeElement = activatorEvent.target as HTMLElement;
    const dropZoneElement = dropZoneRef.current;

    if (over && over.id === "dropzone" && activeElement && dropZoneElement) {
      const itemRect = activeElement.getBoundingClientRect();
      const itemDropZone = dropZoneElement.getBoundingClientRect();
      let x = itemRect.x - itemDropZone.x;
      let y = itemRect.y - itemDropZone.y;

      // Tọa độ các đỉnh của item mới
      const newCorners = [
        { x, y }, // topLeft
        { x: x + width, y }, // topRight
        { x, y: y + height }, // bottomLeft
        { x: x + width, y: y + height }, // bottomRight
      ];
      console.log("🚀 ~ handleDragEnd ~ newCorners:", newCorners);

      let snapped = false;
      let closestDistance = snapDistance;

      // Kiểm tra khoảng cách với các hình vuông đã thả trước đó
      droppedItems.forEach((item) => {
        // Tọa độ các đỉnh của item đã thả trước đó
        const oldCorners = [
          { x: item.x, y: item.y }, // topLeft
          { x: item.x + item.width, y: item.y }, // topRight
          { x: item.x, y: item.y + item.height }, // bottomLeft
          { x: item.x + item.width, y: item.y + item.height }, // bottomRight
        ];
        console.log("🚀 ~ droppedItems.forEach ~ oldCorners:", oldCorners);

        newCorners.forEach((newCorner) => {
          oldCorners.forEach((oldCorner) => {
            const distance = Math.sqrt(
              Math.pow(newCorner.x - oldCorner.x, 2) +
                Math.pow(newCorner.y - oldCorner.y, 2)
            );
            console.log("🚀 ~ oldCorners.forEach ~ distance:", distance);

            // Kiểm tra nếu khoảng cách nhỏ hơn khoảng cách hít và là nhỏ nhất
            if (distance <= snapDistance && distance < closestDistance) {
              x += oldCorner.x - newCorner.x; // Điều chỉnh vị trí x
              y += oldCorner.y - newCorner.y; // Điều chỉnh vị trí y
              closestDistance = distance;
              snapped = true;
            }
          });
        });
      });

      if (!snapped) {
        // Nếu không có hít, item sẽ được thả ở vị trí hiện tại
        setDroppedItems((prev) => [
          ...prev,
          { id: active.id.toString(), x, y, width, height },
        ]);
      } else {
        // Nếu có hít, update lại vị trí
        setDroppedItems((prev) => [
          ...prev,
          { id: active.id.toString(), x, y, width, height },
        ]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div style={{ display: "flex", gap: "10px" }}>
        <SquareItem id="item-1" color="red" width={120} height={120} />
        <SquareItem id="item-2" color="blue" width={120} height={60} />
        <SquareItem id="item-3" color="green" width={30} height={30} />
        <SquareItem id="item-4" color="yellow" width={60} height={60} />
      </div>

      <div ref={dropZoneRef}>
        <DropZone>
          {droppedItems.map((item, index) => (
            <>
              <rect
                key={index}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
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
