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
    name: `Soup`,
    image: "/burger.png",
    link: "/soup",
    itemsCount: 10,
    color: "#FDE3E6",
  },
  {
    id: "2",
    name: "Salads",
    image: "/pizza.png",
    link: "/pizza",
    itemsCount: 10,
    color: "#FEEFDA",
  },
  {
    id: "3",
    name: `Burger <span class="text-base">&</span> Sliders`,
    image: "/cake.png",
    link: "/burger",
    itemsCount: 9,
    color: "#DADFF9",
  },
  {
    id: "4",
    name: "Appetizer",
    image: "/nacho.png",
    link: "/appetizer",
    itemsCount: 5,
    color: "#FDE3E6",
  },
  {
    id: "5",
    name: "On The Oven",
    image: "/panipuri.png",
    link: "/on_the_oven",
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
    name: "Fries",
    image: "/fish.png",
    link: "/fries",
    itemsCount: 9,
    color: "#DADFF9",
  },
  {
    id: "8",
    name: "Soft Drinks",
    image: "/fish.png",
    link: "/soft_drinks",
    itemsCount: 7,
    color: "#DADFF9",
  },
  {
    id: "9",
    name: "Specialty Tea",
    image: "/fish.png",
    link: "/specialty_tea",
    itemsCount: 3,
    color: "#DADFF9",
  },
  {
    id: "10",
    name: "Coffee",
    image: "/fish.png",
    link: "/coffee",
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
