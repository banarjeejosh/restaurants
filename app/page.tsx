"use client";
// import React, { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(MotionPathPlugin as any);

// const MotionPathPage: React.FC = () => {
//   // starter code for gsap
//   const container = useRef<HTMLDivElement>(null);
//   const CircleSvg = useRef<SVGSVGElement>(null); // we only need a ref for the root-level element of this component so we can use selector text for everything else.
//   const holder = useRef(null);
//   //   let circlePath: SVGPathElement;
//   const tl = useRef();

//   useLayoutEffect(() => {
//     const ctx = gsap.context((self) => {
//       const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
//       circlePath.id = "circlePath";

//       CircleSvg.current?.prepend(circlePath);

//       let items: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".menuBox"),
//         numItems: number = items.length,
//         itemStep: number = 1 / numItems,
//         wrapProgress = gsap.utils.wrap(0, 1),
//         snap = gsap.utils.snap(itemStep),
//         wrapTracker = gsap.utils.wrap(0, numItems),
//         tracker = { item: 0 };

//       const endValue = (i: number) =>
//         gsap.utils.wrap(0, 1, i / items.length + 0.75);
//       gsap.set(items, {
//         motionPath: {
//           path: circlePath,
//           align: circlePath,
//           alignOrigin: [0.5, 0.5],
//           autoRotate: true,
//           //   end: [0.5, 0.5],
//           start: endValue,
//         },
//         scale: 0.9,
//       });
//     }, container); // <- Scope!
//     return () => ctx.revert(); // <- Cleanup!
//   }, []);

//   return (
//     <div ref={container}>
//       <div className="flex justify-center align-middle items-center">
//         <svg
//           className="h-auto overflow-visible w-[800px]  "
//           ref={CircleSvg}
//           viewBox="0 0 300 300"
//         >
//           <circle
//             id="holder"
//             ref={holder}
//             className="st0"
//             cx="151"
//             cy="151"
//             r="150"
//           />
//         </svg>
//       </div>
//       <div>
//         <div className="menuBox w-[200px] h-[500px] flex justify-center items-center align-middle bg-green-400 rounded-lg">
//           innter div 1
//         </div>
//         <div className="menuBox w-[200px] h-[500px] flex justify-center items-center align-middle bg-red-400 rounded-lg">
//           innter div 2
//         </div>
//         <div className="menuBox w-[200px] h-[500px] flex justify-center items-center align-middle bg-blue-400 rounded-lg">
//           innter div 3
//         </div>
//         <div className="menuBox w-[200px] h-[500px] flex justify-center items-center align-middle bg-yellow-400 rounded-lg">
//           innter div 4
//         </div>
//         <div className="menuBox w-[200px] h-[500px] flex justify-center items-center align-middle bg-gray-400 rounded-lg">
//           innter div 5
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MotionPathPage;

// pages/index.tsx
import React from "react";
import Image from "next/image";
import HalfCircleCarousel from "./component/HalfCircleCarousel";

const HomePage: React.FC = () => {
  // The items you want to display in the carousel
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
  ];

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
          <h1 className="text-[36.931px] sm:text-[55.542px] pl-10">Let&rsquo;s  eat</h1>
          <div className="flex mb-4 pl-2 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.58957" cy="5.5787" r="4.62851" fill="#FFEDD2" />
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.44925" cy="5.5787" r="4.62851" fill="#FDDDE2" />
            </svg><svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
              <circle cx="5.30929" cy="5.5787" r="4.62851" fill="#CFD5F9" />
            </svg>
          </div>
        </div>

      </div>

      {/* Other components */}
      {/* height: 800px;
    display: flex;
    justify-content: end;
    align-items: end;
} */}
      <div className="  w-full overflow-hidden h-[600px] md:h-[750px] flex justify-end align-baseline items-end ">
        <HalfCircleCarousel />
      </div>
      {/* Other components */}
    </div>
  );
};

export default HomePage;
