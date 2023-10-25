// HalfCircleCarousel.tsx
"use client"
import React from "react";

import MenuItem from "./MenuItem";

import CircleComponent from "./CircleComponent";

interface MenuItem {
  id: string;
  name: string;
  image: string;
  link: string;
  itemsCount: number;
  color: string;
}
// restruant menu items
const items: MenuItem[] = [
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
    link: "/",
    itemsCount: 10,
    color: "#FEEFDA",
  },
  {
    id: "3",
    name: "Ice Cream",
    image: "/cake.png",
    link: "/",
    itemsCount: 10,
    color: "#DADFF9",
  },
  {
    id: "4",
    name: "Drinks",
    image: "/nacho.png",
    link: "/",
    itemsCount: 3,
    color: "#FDE3E6",
  },
  {
    id: "5",
    name: "Coffee",
    image: "/panipuri.png",
    link: "/",
    itemsCount: 5,
    color: "#FEEFDA",
  },
  {
    id: "6",
    name: "Lemonade",
    image: "/fish.png",
    link: "/",
    itemsCount: 10,
    color: "#DADFF9",
  },
];


function HalfCircleCarousel() {

  return (
    <CircleComponent items={items} />
  );
}

export default HalfCircleCarousel;
