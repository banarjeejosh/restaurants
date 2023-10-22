"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { FunctionComponent } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Background from "./component/Background";
import Link from "next/link";
import BottomNav from "./component/BottomNav";
gsap.registerPlugin(ScrollTrigger);

// types
interface MenuItem {
  id: string;
  name: string;
  image: string;
  link: string;
  itemsCount: number;
  color: string;
}
// restruant menu items
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: `Burger <span class="text-base">&</span> Sliders`,
    image: "/burger.png",
    link: "/burger",
    itemsCount: 10,
    color: "#FDE3E6",
  },
  {
    id: "2",
    name: "Pizza",
    image: "/pizza.png",
    link: "/pizza",
    itemsCount: 10,
    color: "#FEEFDA",
  },
  {
    id: "3",
    name: "Ice Cream",
    image: "/cake.png",
    link: "/ice-cream",
    itemsCount: 10,
    color: "#DADFF9",
  },
  {
    id: "4",
    name: "Drinks",
    image: "/nacho.png",
    link: "/drinks",
    itemsCount: 3,
    color: "#FDE3E6",
  },
  {
    id: "5",
    name: "Coffee",
    image: "/panipuri.png",
    link: "/drinks",
    itemsCount: 5,
    color: "#FEEFDA",
  },
  {
    id: "6",
    name: "Lemonade",
    image: "/fish.png",
    link: "/drinks",
    itemsCount: 10,
    color: "#DADFF9",
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
    <main className="relative">
      {itemsWithClones.map((item, index) => (
        <div key={index} className=" flex justify-center items-center align-middle p-20">
          <div className=" relative">

            <Background className="w-full " fillColor={item.color} />

            <div className="z-[2] absolute h-full w-full top-0  flex flex-col justify-center items-center align-middle gap-4">

              <Image
                src={item.image}
                width={400}
                height={200}
                alt="burger"
                className="scale-x-125"
              />
              <h2 className="text-3xl" dangerouslySetInnerHTML={{ __html: item.name }}></h2>
              <p className="text-xs opacity-50">{item.itemsCount} items</p>
              <Link href="/burger" className=" font-bold text-lg px-4  bg-white rounded-3xl" style={{ color: item.color }}>
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="relative flex justify-center align-middle items-center">
        <BottomNav fillColor="#FDE3E6" />
        <div className="w-4 h-4 rounded-full ring-4 ring-white absolute top-4"></div>
      </div>
    </main>


  );
};

export default Home;
