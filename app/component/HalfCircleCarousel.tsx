// HalfCircleCarousel.tsx
"use client";
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
    name: `Appetizers`,
    image: "/burger.png",
    link: "/appetizers",
    itemsCount: 10,
    color: "#FDE3E6",
  },
  {
    id: "2",
    name: "On The Oven",
    image: "/pizza.png",
    link: "/onTheOven",
    itemsCount: 10,
    color: "#FEEFDA",
  },
  {
    id: "3",
    // name: `Burger <span class="text-base">&</span> Sliders`,
    name: `Soups`,
    image: "/cake.png",
    link: "/soups",
    itemsCount: 9,
    color: "#DADFF9",
  },
  {
    id: "4",
    name: "Mains",
    image: "/nacho.png",
    link: "/mains",
    itemsCount: 5,
    color: "#FDE3E6",
  },
  {
    id: "5",
    name: "Fries",
    image: "/panipuri.png",
    link: "/fries",
    itemsCount: 3,
    color: "#FEEFDA",
  },
  {
    id: "6",
    name: "Mains",
    image: "/fish.png",
    link: "/mains",
    itemsCount: 9,
    color: "#DADFF9",
  },
  {
    id: "7",
    name: "salads",
    image: "/fish.png",
    link: "/salads",
    itemsCount: 9,
    color: "#DADFF9",
  },
  {
    id: "8",
    name: "Desserts",
    image: "/fish.png",
    link: "/desserts",
    itemsCount: 7,
    color: "#DADFF9",
  },
  {
    id: "8",
    name: "Hot Drinks",
    image: "/fish.png",
    link: "/hotDrinks",
    itemsCount: 7,
    color: "#DADFF9",
  },
  {
    id: "10",
    name: "Cold Drinks",
    image: "/fish.png",
    link: "/coldDrinks",
    itemsCount: 3,
    color: "#DADFF9",
  },
  {
    id: "11",
    name: "Soft Drinks",
    image: "/fish.png",
    link: "/softDrinks",
    itemsCount: 7,
    color: "#DADFF9",
  },
  {
    id: "12",
    name: "Mocktails",
    image: "/fish.png",
    link: "/mocktails",
    itemsCount: 7,
    color: "#DADFF9",
  },
];

function HalfCircleCarousel() {
  return <CircleComponent items={items} />;
}

export default HalfCircleCarousel;
