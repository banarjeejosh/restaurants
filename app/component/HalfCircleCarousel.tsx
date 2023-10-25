// HalfCircleCarousel.tsx
import React, { useRef, useState } from "react";
import styles from "./HalfCircleCarousel.module.css";
import { useSwipeable } from "react-swipeable";

const items = [
  { id: "1", color: "#E57373" },
  { id: "2", color: "#81C784" },
  { id: "3", color: "#64B5F6" },
  { id: "4", color: "#FFD54F" },
  { id: "5", color: "#FF8A65" },
  { id: "6", color: "#7986CB" },
  { id: "7", color: "#AED581" },
  { id: "8", color: "#9575CD" },
  { id: "9", color: "#4DB6AC" },
];

function HalfCircleCarousel() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const initialX = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCenterIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (direction === "right") {
      setCenterIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    }
  };

  const handleClick = (index) => {
    // Determine the shortest path (clockwise or counter-clockwise) to make the clicked item the center.
    const diffClockwise = (index - centerIndex + items.length) % items.length;
    const diffCounterClockwise = items.length - diffClockwise;

    if (diffClockwise <= diffCounterClockwise) {
      setCenterIndex(index);
    } else {
      setCenterIndex(index);
    }
  };

  const handlePointerDown = (event) => {
    initialX.current = event.clientX;
  };

  const handlePointerMove = (event) => {
    if (!initialX.current) return;
    const deltaX = initialX.current - event.clientX;
    if (deltaX > 50) {
      setCenterIndex((prev) => (prev + 1) % items.length);
      initialX.current = null;
    } else if (deltaX < -50) {
      setCenterIndex((prev) => (prev - 1 + items.length) % items.length);
      initialX.current = null;
    }
  };

  const handlePointerUp = () => {
    initialX.current = null;
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = -2; i <= 2; i++) {
      const currentIndex = (centerIndex + i + items.length) % items.length;
      visibleItems.push(items[currentIndex]);
    }
    return visibleItems;
  };
  return (
    <div
      className={styles.carouselContainer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...handlers}
    >
      {getVisibleItems().map((item, index) => (
        <div
          key={item.id}
          className={styles.carouselItem}
          style={{
            transform: `rotate(${(index - 2) * 36}deg) translateY(-150px)`,
            backgroundColor: item.color,
            opacity: index === 2 ? 1 : index === 1 || index === 3 ? 0.7 : 0.5,
            zIndex: index === 2 ? 3 : index === 1 || index === 3 ? 2 : 1,
          }}
          onClick={() =>
            handleClick((centerIndex + index - 2 + items.length) % items.length)
          }
        >
          {item.id}
        </div>
      ))}
    </div>
  );
}

export default HalfCircleCarousel;
