import Image from "next/image";
import React from "react";
import CircleComponent from "../component/CircleComponent";

interface Item {
  id: string;
  name: string;
  image: string;
  link?: string;
  itemsCount?: number;
  color: string;
  paragraph?: string;
  grm?: number;
}
// restruant menu items
const items: Item[] = [
  {
    id: "1",
    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
  {
    id: "2",

    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
  {
    id: "3",
    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
  {
    id: "4",
    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
  {
    id: "5",
    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
  {
    id: "6",
    name: `Old School Beef Slider`,
    image: "/burbur.png",
    color: "#FEEFDA",
    paragraph: "Grilled Beef, house sauce, white cheddar, onion rings",
    grm: 1.9,
  },
];

const Burger = () => {
  return (
    <div className="relative flex flex-col justify-between align-middle items-center min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center mt-10">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="logo"
          className="pointer-events-none"
        />
        <div className=" flex flex-row align-text-bottom items-end">
          <h1 className="text-[36.931px] sm:text-[55.542px] pl-10">
            Let&rsquo;s eat
          </h1>
          <div className="flex mb-4 pl-2 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
            >
              <circle cx="5.58957" cy="5.5787" r="4.62851" fill="#FFEDD2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
            >
              <circle cx="5.44925" cy="5.5787" r="4.62851" fill="#FDDDE2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
            >
              <circle cx="5.30929" cy="5.5787" r="4.62851" fill="#CFD5F9" />
            </svg>
          </div>
        </div>
      </div>

      <div className="  w-full overflow-hidden h-[60vh] md:h-[77vh] flex justify-end align-baseline items-end ">
        <CircleComponent items={items} />
      </div>
      {/* Other components */}
    </div>
  );
};

export default Burger;
