"use client";
import React from "react";
import Image from "next/image";
import HalfCircleCarousel from "./component/HalfCircleCarousel";
import { useSearchParams } from "next/navigation";

const HomePage: React.FC = () => {
  const searchParams = useSearchParams();

  const food: string | null = searchParams.get("food");
  const [search, setSearch] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSearch(food);
  }, [food, setSearch]);
  // The items you want to display in the carousel

  return (
    <div className="relative flex flex-col justify-between align-middle items-center mainPage">
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

      <div className="screenSize w-full overflow-hidden flex grow justify-end align-baseline items-end ">
        <HalfCircleCarousel search={search} />
      </div>
      {/* Other components */}
    </div>
  );
};

export default HomePage;
