import React from "react";

import { chartColors } from "../../../config/colors";

interface ChartBackgroundProps {
  width: number;
  height: number;
}

export const ChartBackground: React.FC<ChartBackgroundProps> = ({
  width,
  height,
}) => {
  return (
    <>
      <defs>
        <radialGradient
          id="radial-gradient"
          cx={width / 2}
          cy={height / 2}
          r={(width / 2 + height / 2) / 2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".25" stopColor={chartColors.backgroundPrimary}></stop>
          <stop offset="1" stopColor={chartColors.backgroundSecondary}></stop>
        </radialGradient>
      </defs>
      <rect
        className="background"
        width={width}
        height={height}
        fill="url(#radial-gradient)"
      ></rect>
    </>
  );
};
