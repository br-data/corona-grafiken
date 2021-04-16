import React from "react";

import { chartColors } from "../../../config/colors";

interface ChartHeaderProps {
  title: string;
  description: string;
  scalingFactor?: number;
  transform?: string;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  description,
  scalingFactor = 1,
  transform,
}) => {
  return (
    <g className="header" transform={transform}>
      <text
        x="0"
        y={13 * scalingFactor}
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize={24 * scalingFactor}
        fontWeight="400"
        fill={chartColors.fontPrimary}
      >
        {title}
      </text>
      <text
        x="0"
        y={36 * scalingFactor}
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize={15 * scalingFactor}
        fontWeight="300"
        fill={chartColors.fontSecondary}
      >
        {description}
      </text>
    </g>
  );
};
