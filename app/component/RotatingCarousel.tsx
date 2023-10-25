// components/RotatingCarousel.tsx
import React, { useState } from "react";
import styles from "./RotatingCarousel.module.css"; // Importing our CSS module.

const RotatingCarousel: React.FC = () => {
  // Initial array of items. This could come from props if the component needs to be reusable.
  const initialItems = ["1", "2", "3", "4", "5"];
  const [items, setItems] = useState<string[]>(initialItems);

  const handleItemClick = (index: number) => {
    const newItems = [...items];
    while (index > 0) {
      const t = newItems.shift(); // take the first element out
      if (t) {
        newItems.push(t); // move it to the end
      }
      index--;
    }
    setItems(newItems);
  };

  return (
    <div className={styles.carouselContainer}>
      {items.map((item, index) => (
        <div
          key={item}
          className={`${styles.carouselItem} ${
            index === 0 ? styles.activeItem : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default RotatingCarousel;
