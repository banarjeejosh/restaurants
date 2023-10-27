"use client";
import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./HalfCircleCarousel.module.css";
import MenuItem from "./MenuItem";
import CirclePointer from "./CirclePointer";
import BottomNav from "./BottomNav";

const CircleComponent = ({ items }: any) => {
  const [centerIndex, setCenterIndex] = useState(0);

  const initialX = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    //preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction: any) => {
    if (direction === "left") {
      setCenterIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (direction === "right") {
      setCenterIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    }
  };

  const handleClick = (index: any) => {
    const diffClockwise = (index - centerIndex + items.length) % items.length;
    const diffCounterClockwise = items.length - diffClockwise;

    if (diffClockwise <= diffCounterClockwise) {
      setCenterIndex(index);
    } else {
      setCenterIndex(index);
    }
  };

  const handlePointerDown = (event: any) => {
    initialX.current = event.clientX;
  };

  const handlePointerMove = (event: any) => {
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

  const activeItem = items[centerIndex]; // Identify the active card/menu item

  return (
    <div
      className={`${styles.carouselContainer} screeFix flex justify-center align-middle items-center`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...handlers}
    >
      <div className="flex justify-center items-center align-middle">
        {getVisibleItems().map((item, index) => (
          <div
            key={item.id}
            className={styles.carouselItem}
            style={{
              transform: `rotate(${(index - 2) * 36}deg) translateY(-150px)`,
              backgroundColor: "transparent",
              opacity: index === 2 ? 1 : index === 1 || index === 3 ? 0.7 : 0.5,
              zIndex: index === 2 ? 3 : index === 1 || index === 3 ? 2 : 1,
            }}
            onClick={() =>
              handleClick(
                (centerIndex + index - 2 + items.length) % items.length
              )
            }
          >
            <div className="flex flex-col justify-center align-middle items-center">
              <MenuItem item={item} />

              <CirclePointer fillColor={item.color} />
            </div>
          </div>
        ))}
        <BottomNav fillColor={activeItem.color} />
      </div>
    </div>
  );
};

export default CircleComponent;
