import React from "react";

interface circlePointerProps {
  fillColor: string;
  className?: string;
}

const CirclePointer: React.FC<circlePointerProps> = ({
  fillColor,
  className,
}) => {
  return (
    <div className="absolute bottom-[-340px] lg:bottom-[-340px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <ellipse
          cx="6.99976"
          cy="7.04943"
          rx="6.42917"
          ry="6.40375"
          transform="rotate(-0.323932 6.99976 7.04943)"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default CirclePointer;
