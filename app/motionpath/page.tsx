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
import HalfCircleCarousel from "../component/HalfCircleCarousel";

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
    <div className="mt-[300px]">
      {/* Other components */}
      <HalfCircleCarousel items={items} />
      {/* Other components */}
    </div>
  );
};

export default HomePage;
