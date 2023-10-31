import Image from "next/image";
import React from "react";
import CircleComponent from "../component/CircleComponent";
import Fooditems from "@/data/data.json";
import Link from "next/link";
export default function Page({ params }: { params: { food: string } }) {
  // return <div>My Post: {params.food}</div>;
  const food = params.food;
  const items = Fooditems[food as keyof typeof Fooditems];

  return (
    <div className="relative flex flex-col justify-between align-middle items-center mainPage">
      <div className=" flex flex-col justify-center align-middle items-center mt-10">
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
        <Link
          href="/"
          className=" absolute left-1 lg:left-4 lg:top-16 scale-50 lg:scale-[1]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="79"
            height="79"
            viewBox="0 0 79 79"
            fill="none"
          >
            <g filter="url(#filter0_d_73_4850)">
              <rect
                x="4.71588"
                y="0.0527344"
                width="70"
                height="70"
                rx="20"
                fill={items[0].color}
              />
            </g>
            <path
              d="M26.1552 33.9921C25.5694 34.5779 25.5694 35.5276 26.1552 36.1134L35.7012 45.6593C36.2869 46.2451 37.2367 46.2451 37.8225 45.6593C38.4083 45.0735 38.4083 44.1238 37.8225 43.538L29.3372 35.0527L37.8225 26.5675C38.4083 25.9817 38.4083 25.0319 37.8225 24.4461C37.2367 23.8603 36.2869 23.8603 35.7012 24.4461L26.1552 33.9921ZM52.2159 33.5527H27.2159V36.5527H52.2159V33.5527Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_73_4850"
                x="0.715881"
                y="0.0527344"
                width="78"
                height="78"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_73_4850"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_73_4850"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </Link>
      </div>

      <div className="screenSize w-full overflow-hidden flex grow justify-end align-baseline items-end ">
        <CircleComponent items={items} />
      </div>
      {/* Other components */}
    </div>
  );
}
