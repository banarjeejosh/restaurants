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

  //   const handleClick = (index: any) => {
  //     const diffClockwise = (index - centerIndex + items.length) % items.length;
  //     const diffCounterClockwise = items.length - diffClockwise;

  //     if (diffClockwise <= diffCounterClockwise) {
  //       setCenterIndex(index);
  //     } else {
  //       setCenterIndex(index);
  //     }
  //   };
  //   const handleClick = (index: number) => {
  //     // Calculate the distance and direction to the clicked item.
  //     const totalItems = items.length;
  //     let moveBy = index - centerIndex;

  //     // Adjusting if it's shorter to continue in the same direction
  //     if (Math.abs(moveBy) > totalItems / 2) {
  //       moveBy = moveBy - Math.sign(moveBy) * totalItems;
  //     }

  //     // Splitting the movement across multiple animation frames to create a smooth transition
  //     const direction = moveBy < 0 ? "right" : "left"; // Determine the direction to move
  //     const steps = Math.abs(moveBy); // Determine how many steps to take

  //     const moveOneStep = () => {
  //       // Update the centerIndex by one step in the correct direction
  //       handleSwipe(direction);

  //       if (steps > 1) {
  //         requestAnimationFrame(moveOneStep); // Continue moving until we reach the desired item
  //       }
  //     };

  //     moveOneStep(); // Start moving
  //   };
  //   const handleClick = (index: number) => {
  //     const totalItems = items.length;

  //     // Calculate the shortest distance to the target item
  //     let stepsToMove = index - centerIndex;
  //     if (Math.abs(stepsToMove) > totalItems / 2) {
  //       stepsToMove = stepsToMove - Math.sign(stepsToMove) * totalItems;
  //     }

  //     // Set the new center index, considering the carousel's circular nature
  //     const newIndex = (centerIndex + stepsToMove + totalItems) % totalItems;
  //     setCenterIndex(newIndex);
  //   };
  //   const handleClick = (index: number) => {
  //     const totalItems = items.length;

  //     // Current position can be calculated directly from the center index.
  //     let currentPosition = centerIndex;

  //     // Calculate steps to move forward or backward.
  //     let forwardSteps = (index - currentPosition + totalItems) % totalItems;
  //     let backwardSteps = (currentPosition - index + totalItems) % totalItems;
  //     debugger;
  //     // If moving forward is a shorter path (or equal, to prefer forward movement)
  //     if (forwardSteps <= backwardSteps) {
  //       // Here, we calculate the new index by moving forward.
  //       setCenterIndex((currentPosition + forwardSteps) % totalItems);
  //     } else {
  //       // Otherwise, we calculate the new index by moving backward.
  //       setCenterIndex(
  //         (currentPosition - backwardSteps + totalItems) % totalItems
  //       );
  //     }
  //   };
  const handleClick = (index: number) => {
    const totalItems = items.length;

    // Calculate the distance in both directions
    const forwardSteps = (index - centerIndex + totalItems) % totalItems;
    const backwardSteps = (centerIndex - index + totalItems) % totalItems;

    // Determine the shortest direction and the steps to move
    const moveForward = forwardSteps <= backwardSteps;
    const stepsToMove = moveForward ? forwardSteps : backwardSteps;

    // Determine the step size (-1 for backward, 1 for forward)
    const stepSize = moveForward ? 1 : -1;

    // Create an array representing each step of the animation
    // Each element is the next index the carousel should show
    const newQueue = Array.from({ length: stepsToMove }, (_, i) => {
      const nextStep = centerIndex + stepSize * (i + 1); // Calculate the next step
      return (nextStep + totalItems) % totalItems; // Ensure the next step wraps around correctly
    });

    // Set the animation queue with the newly created steps array
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
    for (let i = -2; i <= 2; i++) {
      const currentIndex = (centerIndex + i + items.length) % items.length;
      visibleItems.push(items[currentIndex]);
    }
    return visibleItems;
  };

  const activeItem = items[centerIndex]; // Identify the active card/menu item
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
