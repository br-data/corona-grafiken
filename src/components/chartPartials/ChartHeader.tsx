import React from "react";

import { chartColors } from '../../config/colors';

interface ChartHeaderProps {
  title: string;
  description: string;
  transform?: string
}

export const ChartHeader: React.FC<ChartHeaderProps>=({
  title,
  description,
  transform
}) => {

  return (
    <g className="header" transform={transform}>
      <text
        x="0"
        y="0"
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="24"
        fontWeight="600"
        fill={chartColors.fontPrimary}
      >
        {title}
      </text>
      <text
        x="0"
        y="25"
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="15"
        fontWeight="300"
        fill={chartColors.fontSecondary}
      >
        {description}
      </text>
    </g>
  )
};