"use client";

import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import { gsap } from "gsap";
import { FunctionComponent } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MenuItem from "../component/MenuItem";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
gsap.registerPlugin(MotionPathPlugin);

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
// types
const TesPage = () => {
  let callCount = 0;

  const component = useRef<HTMLDivElement>(null); // we only need a ref for the root-level element of this component so we can use selector text for everything else.
  const CircleSvg = useRef<SVGSVGElement>(null); // we only need a ref for the root-level element of this component so we can use selector text for everything else.
  const holder = useRef(null);
  let circlePath: SVGPathElement;
  useEffect(() => {
    console.log(
      "useEffect() call",
      ++callCount,
      "(React 18 strict mode calls twice!)"
    );

    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...))
    let ctx = gsap.context(() => {
      const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
      circlePath.id = "circlePath";

      CircleSvg.current?.prepend(circlePath);

      let items: HTMLElement[] = gsap.utils.toArray(".item"),
        numItems: number = items.length,
        itemStep: number = 1 / numItems,
        wrapProgress = gsap.utils.wrap(0, 1),
        snap = gsap.utils.snap(itemStep),
        wrapTracker = gsap.utils.wrap(0, numItems),
        tracker = { item: 0 };

      gsap.set(items, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: (i: number) => gsap.utils.wrap(0, 1, i / items.length + 0.75),
        },
        scale: 0.9,
      });

      const tl = gsap.timeline({ paused: true, reversed: true });

      tl.to(".wrapper", {
        rotation: 360,
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      });

      tl.to(
        items,
        {
          rotation: "-=360",
          transformOrigin: "center",
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        tracker,
        {
          item: numItems,
          duration: 1,
          ease: "none",
          modifiers: {
            item(value) {
              return wrapTracker(numItems - Math.round(value));
            },
          },
        },
        0
      );
      (items as HTMLElement[]).forEach(function (el: HTMLElement, i: number) {
        el.addEventListener("click", function () {
          var current = tracker.item,
            activeItem = i;

          if (i === current) {
            return;
          }
          if (component.current) {
            const prevActiveItem =
              component.current.querySelector(".item.active");
            if (prevActiveItem) {
              prevActiveItem.classList.remove("active");
            }
          }
          //set active item to the item that was clicked and remove active class from all items
          items[activeItem].classList.add("active");

          var diff = current - i;

          if (Math.abs(diff) < numItems / 2) {
            moveWheel(diff * itemStep);
          } else {
            var amt = numItems - Math.abs(diff);

            if (current > i) {
              moveWheel(amt * -itemStep);
            } else {
              moveWheel(amt * itemStep);
            }
          }
        });
      });

      function moveWheel(amount: number) {
        let progress = tl.progress();
        tl.progress(wrapProgress(snap(tl.progress() + amount)));
        let next = tracker.item;
        tl.progress(progress);
        if (component.current) {
          //   gsap.set(items[next], {
          //     rotation: 0,
          //     transformOrigin: "50% 50%",
          //   });

          const prevActiveItem =
            component.current.querySelector(".item.active");
          if (prevActiveItem) {
            prevActiveItem.classList.remove("active");
          }
        }

        items[next].classList.add("active");

        gsap.to(tl, {
          progress: snap(tl.progress() + amount),
          modifiers: {
            progress: wrapProgress,
          },
        });
      }
    }, component); // <- scopes all selector text inside the context to this component (optional, default is document)

    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <div ref={component}>
      <div className="container">
        <div className="wrapper">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`item ${index + 1} ${index === 0 && "active"}`}
            >
              <MenuItem item={item} />
            </div>
          ))}

          <svg
            className="h-auto overflow-visible w-[1000px] z-[-1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            ref={CircleSvg}
            viewBox="0 0 300 300"
          >
            <circle
              id="holder"
              ref={holder}
              className="st0"
              cx="151"
              cy="151"
              r="150"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default TesPage;
