"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./HalfCircleCarousel.module.css";
import MenuItem from "./MenuItem";
import CirclePointer from "./CirclePointer";
import BottomNav from "./BottomNav";

const CircleComponent = ({ items }: any) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [animationQueue, setAnimationQueue] = useState<number[]>([]);

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
  const handleClick = (index: number) => {
    if (items.length <= 1) return; // No need to handle click for one item

    if (items.length <= 4) {
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
    } else {
      const totalItems = items.length;
      const forwardSteps = (index - centerIndex + totalItems) % totalItems;
      const backwardSteps = (centerIndex - index + totalItems) % totalItems;

      const moveForward = forwardSteps <= backwardSteps;
      const stepsToMove = moveForward ? forwardSteps : backwardSteps;
      const stepSize = moveForward ? 1 : -1;

      const newQueue = Array.from({ length: stepsToMove }, (_, i) => {
        const nextStep = centerIndex + stepSize * (i + 1);
        return (nextStep + totalItems) % totalItems; // Ensuring we don't go out of bounds
      });

      setAnimationQueue(newQueue);
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
    if (items.length === 1) {
      visibleItems.push(items[0]);
      return visibleItems; // If only one item, it's the only one visible
    }
    if (items.length > 1 && items.length <= 4) {
      for (let i = -1; i <= 1; i++) {
        // Display three items centered around the centerIndex
        const currentIndex = (centerIndex + i + items.length) % items.length;
        visibleItems.push(items[currentIndex]);
      }
      return visibleItems;
    } else if (items.length >= 5) {
      const totalVisibleItems = items.length < 5 ? items.length : 5; // Do not attempt to show more items than exist
      const halfWay = Math.floor(totalVisibleItems / 2);

      for (let i = -halfWay; i <= halfWay; i++) {
        const currentIndex = (centerIndex + i + items.length) % items.length;
        visibleItems.push(items[currentIndex]);
      }
      return visibleItems;
    }

    // Special handling for fewer than 5 items.
    const totalItems = items.length;
    const emptySlots = 5 - totalItems; // Number of missing items to make 5

    for (let i = 0; i < totalItems; i++) {
      visibleItems.push(items[i]);
    }

    // If there are fewer than 5 items, we adjust the positions without repeating the items.
    for (let i = 0; i < emptySlots; i++) {
      visibleItems.push(null); // Push placeholders to maintain the structure
    }

    return visibleItems;
  };

  const activeItem = items[centerIndex]; // Identify the active card/menu item

  // New function to calculate the degree of rotation
  const calculateRotationDegree = (totalItems: number, index: number) => {
    // If there are fewer than 3 items, we adjust the positions without repeating the items.

    if (totalItems <= 3) {
      // it should be 3 item in a 45 degree circle with 1 item in the center
      const degreePerItem = 90 / (totalItems - 1); // Distribute items in 180 degrees
      return degreePerItem * index - 45; // Shift by -90 to start from the left
    }

    // Calculate the degree based on the total visible items
    const degreePerItem = 180 / (totalItems - 1); // Distribute items in 180 degrees
    return degreePerItem * index - 90; // Shift by -90 to start from the left
  };

  useEffect(() => {
    if (animationQueue.length === 0) return;

    // Take the first step from the queue and update centerIndex
    const [nextIndex, ...remainingQueue] = animationQueue;
    setCenterIndex((prev) => (nextIndex + items.length) % items.length);

    // Use a timeout to allow time for the re-render
    const timeoutId = setTimeout(() => {
      setAnimationQueue(remainingQueue);
    }, 300); // This delay should match your CSS transition duration

    // Clean up the timeout if the component unmounts mid-animation
    return () => clearTimeout(timeoutId);
  }, [animationQueue, items.length]);
  return (
    <div
      className={`${styles.carouselContainer} screeFix flex justify-center align-middle items-center`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...handlers}
    >
      <div className="flex justify-center items-center align-middle">
        {getVisibleItems().map((item, index) => {
          if (items.length === 1) {
            return (
              <div
                key={item.id}
                className={styles.carouselItem}
                style={{
                  transform: ` translateY(-150px)`,
                  backgroundColor: "transparent",
                  opacity: 1,
                  zIndex: 1,
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
            );
          } else if (items.length <= 4 && items.length > 1) {
            if (item === null) return <></>;
            const totalVisibleItems = getVisibleItems().length;

            const rotationDegree = calculateRotationDegree(
              totalVisibleItems,
              index
            );
            // debugger;
            return (
              <div
                key={item.id}
                className={styles.carouselItem}
                style={{
                  transform: `rotate(${
                    (index - 1) * 45
                  }deg) translateY(-150px)`,
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
          } else if (items.length <= 5 && items.length > 3) {
            console.log(
              (centerIndex + index - 2 + items.length) % items.length
            );
            return (
              <div
                key={item.id}
                className={styles.carouselItem}
                style={{
                  transform: `rotate(${
                    (index - 2) * 36
                  }deg) translateY(-150px)`,
                  backgroundColor: "transparent",
                  opacity:
                    index === 2
                      ? 1
                      : index === 1 || index === 3
                      ? 0.7
                      : index === 0 || index === 4
                      ? 0.5
                      : 0,
                  zIndex:
                    index === 2
                      ? 3
                      : index === 1 || index === 3
                      ? 2
                      : index === 0 || index === 4
                      ? 1
                      : 0,
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
            );
          }

          return (
            <div
              key={item.id}
              className={styles.carouselItem}
              style={{
                transform: `rotate(${(index - 2) * 36}deg) translateY(-150px)`,
                backgroundColor: "transparent",
                opacity:
                  index === 2 ? 1 : index === 1 || index === 3 ? 0.7 : 0.5,
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
          );
        })}

        <BottomNav fillColor={activeItem.color} />
      </div>
    </div>
  );
};

export default CircleComponent;
