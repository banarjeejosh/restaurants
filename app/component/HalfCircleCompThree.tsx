import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./HalfCircleCarousel.module.css";
import MenuItem from "./MenuItem";
import CirclePointer from "./CirclePointer";
import BottomNav from "./BottomNav";

const HalfCircleCompThree = ({ items }: any) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [animationQueue, setAnimationQueue] = useState<number[]>([]);

  const initialX = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
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

  const handleClick = (index: number) => {
    const totalItems = items.length;
    const forwardSteps = (index - centerIndex + totalItems) % totalItems;
    const backwardSteps = (centerIndex - index + totalItems) % totalItems;

    const moveForward = forwardSteps <= backwardSteps;
    const stepsToMove = moveForward ? forwardSteps : backwardSteps;
    const stepSize = moveForward ? 1 : -1;

    const newQueue = Array.from({ length: stepsToMove }, (_, i) => {
      const nextStep = centerIndex + stepSize * (i + 1);
      return (nextStep + totalItems) % totalItems;
    });

    setAnimationQueue(newQueue);
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

    for (let i = -1; i <= 1; i++) {
      // Display three items centered around the centerIndex
      const currentIndex = (centerIndex + i + items.length) % items.length;
      visibleItems.push(items[currentIndex]);
    }
    return visibleItems;
  };

  const activeItem = items[centerIndex];

  useEffect(() => {
    if (animationQueue.length === 0) return;

    const [nextIndex, ...remainingQueue] = animationQueue;
    setCenterIndex((prev) => (nextIndex + items.length) % items.length);

    const timeoutId = setTimeout(() => {
      setAnimationQueue(remainingQueue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [animationQueue, items.length]);

  return (
    <div
      className={`${styles.carouselContainer} screenFix flex justify-center align-middle items-center`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...handlers}
    >
      <div className="flex justify-center items-center align-middle">
        {getVisibleItems().map((item, index) => {
          return (
            <div
              key={item.id}
              className={styles.carouselItem}
              style={{
                transform: `rotate(${(index - 1) * 60}deg) translateY(-150px)`,
                backgroundColor: "transparent",
                opacity: index === 1 ? 1 : 0.7,
                zIndex: index === 1 ? 3 : 2,
              }}
              onClick={() =>
                handleClick(
                  (centerIndex + index - 1 + items.length) % items.length
                )
              }
            >
              <div className="flex flex-col justify-center align-middle items-center">
                <MenuItem item={item} />
                <CirclePointer fillColor={item.color} />
              </div>
            </div>
          );
        })}

        <BottomNav fillColor={activeItem.color} />
      </div>
    </div>
  );
};

export default HalfCircleCompThree;
