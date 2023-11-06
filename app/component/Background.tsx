import React from "react";

interface BackgroundProps {
  fillColor: string;
  className?: string;
}
const Background: React.FC<BackgroundProps> = ({ fillColor, className }) => {
  const svgStyles = {
    filter: "drop-shadow(1px 7px 8px " + fillColor + ")",
    WebkitFilter: "drop-shadow(1px 7px 8px " + fillColor + ")", // For Safari
  };
  // if ((fillColor = "#FFEDD2")) {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="313"
  //       height="521"
  //       viewBox="0 0 313 521"
  //       fill="none"
  //     >
  //       <g opacity="0.9" filter="url(#filter0_d_73_3092)">
  //         <path
  //           d="M14.5965 64.2617C14.1112 47.4413 26.4396 32.9848 43.1257 30.8081L235.943 5.65559C260.051 2.51073 281.212 21.7682 280.347 46.0653L266.265 441.514C265.488 463.335 247.087 480.349 225.271 479.418L62.9193 472.487C42.3018 471.607 25.8686 454.945 25.2735 434.317L14.5965 64.2617Z"
  //           fill="#FFEDD2"
  //         />
  //       </g>
  //       <defs>
  //         <filter
  //           id="filter0_d_73_3092"
  //           x="0.92941"
  //           y="0.76704"
  //           width="311.3"
  //           height="519.647"
  //           filterUnits="userSpaceOnUse"
  //           color-interpolation-filters="sRGB"
  //         >
  //           <feFlood flood-opacity="0" result="BackgroundImageFix" />
  //           <feColorMatrix
  //             in="SourceAlpha"
  //             type="matrix"
  //             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //             result="hardAlpha"
  //           />
  //           <feOffset dx="9.10216" dy="18.2043" />
  //           <feGaussianBlur stdDeviation="11.3777" />
  //           <feComposite in2="hardAlpha" operator="out" />
  //           <feColorMatrix
  //             type="matrix"
  //             values="0 0 0 0 1 0 0 0 0 0.929412 0 0 0 0 0.823529 0 0 0 1 0"
  //           />
  //           <feBlend
  //             mode="normal"
  //             in2="BackgroundImageFix"
  //             result="effect1_dropShadow_73_3092"
  //           />
  //           <feBlend
  //             mode="normal"
  //             in="SourceGraphic"
  //             in2="effect1_dropShadow_73_3092"
  //             result="shape"
  //           />
  //         </filter>
  //       </defs>
  //     </svg>
  //   );
  // }
  return (
    // <svg
    //   className={className}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="311"
    //   height="520"
    //   viewBox="0 0 290 500"
    //   fill="none"
    // >
    //   <path
    //     d="M13.4267 60.9384C13.1347 44.4993 25.3363 30.5087 41.6625 28.5628L236.478 5.34258C260.066 2.5311 280.532 21.5752 279.424 45.3043L260.867 442.543C259.872 463.855 241.71 480.278 220.406 479.132L56.3954 470.308C36.2613 469.225 20.3864 452.768 20.0283 432.608L13.4267 60.9384Z"
    //     fill={fillColor}
    //   />
    // </svg>
    <>
      <svg
        className={className}
        id="color-changing-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="311"
        height="520"
        viewBox="0 0 290 500"
        fill="none"
        style={svgStyles}
      >
        <path
          d="M13.4267 60.9384C13.1347 44.4993 25.3363 30.5087 41.6625 28.5628L236.478 5.34258C260.066 2.5311 280.532 21.5752 279.424 45.3043L260.867 442.543C259.872 463.855 241.71 480.278 220.406 479.132L56.3954 470.308C36.2613 469.225 20.3864 452.768 20.0283 432.608L13.4267 60.9384Z"
          fill={fillColor}
          filter={`drop-shadow(1px 7px 8px ${fillColor})`}
        />
      </svg>
      {/* <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="311"
        height="520"
        viewBox="0 0 290 500"
        fill="none"
      >
        <defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M13.4267 60.9384C13.1347 44.4993 25.3363 30.5087 41.6625 28.5628L236.478 5.34258C260.066 2.5311 280.532 21.5752 279.424 45.3043L260.867 442.543C259.872 463.855 241.71 480.278 220.406 479.132L56.3954 470.308C36.2613 469.225 20.3864 452.768 20.0283 432.608L13.4267 60.9384Z"
          fill={fillColor}
          filter="url(#dropshadow)"
        />
      </svg> */}
    </>
  );
};

export default Background;
