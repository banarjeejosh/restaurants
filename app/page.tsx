"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { FunctionComponent } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// types
interface MenuItem {
  id: string;
  name: string;
  image: string;
  link: string;
  itemsCount: number;
  color?: string;
}
// restruant menu items
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Burger",
    image: "/burger.png",
    link: "/burger",
    itemsCount: 10,
    color: "red",
  },
  {
    id: "2",
    name: "Pizza",
    image: "/burger.png",
    link: "/pizza",
    itemsCount: 10,
    color: "blue",
  },
  {
    id: "3",
    name: "Ice Cream",
    image: "/burger.png",
    link: "/ice-cream",
    itemsCount: 10,
    color: "green",
  },
  {
    id: "4",
    name: "Drinks",
    image: "/burger.png",
    link: "/drinks",
    itemsCount: 3,
    color: "yellow",
  },
  {
    id: "5",
    name: "Drinks",
    image: "/burger.png",
    link: "/drinks",
    itemsCount: 5,
    color: "purple",
  },
  {
    id: "6",
    name: "Drinks",
    image: "/burger.png",
    link: "/drinks",
    itemsCount: 10,
    color: "pink",
  },
];

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ITEM_WIDTH = 300; // This should be the width of your item including any margin or padding
  const CLONE_COUNT = 2; // Number of items to clone at the end and beginning

  // Clone the first and last items to give the illusion of an infinite carousel
  const itemsWithClones = [
    ...menuItems.slice(-CLONE_COUNT),
    ...menuItems,
    ...menuItems.slice(0, CLONE_COUNT),
  ];

  // On mount, set the initial position to the first "real" item, not a clone
  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        x: -ITEM_WIDTH * CLONE_COUNT, // because we added CLONE_COUNT items before the real items
      });
    }
  }, []);

  const handleNextClick = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: "-=" + ITEM_WIDTH,
        modifiers: {
          x: (x) => {
            // When we reach the end, loop back to the beginning seamlessly
            const newX = parseFloat(x);
            if (newX <= -ITEM_WIDTH * (menuItems.length + CLONE_COUNT)) {
              return -ITEM_WIDTH * CLONE_COUNT + "px";
            }
            return x;
          },
        },
      });
    }
  };

  const handlePrevClick = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: "+=" + ITEM_WIDTH,
        modifiers: {
          x: (x) => {
            // When we reach the beginning, loop back to the end seamlessly
            const newX = parseFloat(x);
            if (newX >= -ITEM_WIDTH) {
              return -ITEM_WIDTH * menuItems.length + "px";
            }
            return x;
          },
        },
      });
    }
  };

  return (
    <div style={{ overflow: "hidden", position: "relative", width: "900px" }}>
      {" "}
      {/* Adjust the wrapper width as needed */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          willChange: "transform",
          position: "relative",
        }}
      >
        {itemsWithClones.map((item, index) => (
          <div key={index} style={{ minWidth: `${ITEM_WIDTH}px` }}>
            <div style={{ backgroundColor: item.color, padding: "20px" }}>
              <Image
                src={item.image}
                width={200}
                height={200}
                alt={item.name}
              />
              <h2>{item.name}</h2>
              <p>{`${item.itemsCount} items`}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevClick}
        style={{ position: "absolute", top: "50%", left: "0", zIndex: 2 }}
      >
        Prev
      </button>
      <button
        onClick={handleNextClick}
        style={{ position: "absolute", top: "50%", right: "0", zIndex: 2 }}
      >
        Next
      </button>
    </div>
  );
};

export default Home;
