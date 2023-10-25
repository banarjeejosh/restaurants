import React, { useState } from "react";
import styles from "./HalfCircleCarousel.module.css";

const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function HalfCircleCarousel() {
  const [centerIndex, setCenterIndex] = useState(2);

  const handleClick = (index) => {
    setCenterIndex(index);
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
    <div className={styles.carouselContainer}>
      {getVisibleItems().map((item, index) => (
        <div
          key={item}
          className={styles.carouselItem}
          style={{ transform: `rotate(${(index - 2) * 36}deg)` }}
          onClick={() =>
            handleClick((centerIndex + index - 2 + items.length) % items.length)
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default HalfCircleCarousel;
