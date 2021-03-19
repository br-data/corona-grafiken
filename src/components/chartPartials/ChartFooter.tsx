import React from "react";

import { chartColors } from "../../config/colors";

interface ChartFooterProps {
  text: string;
  scalingFactor?: number;
  transform?: string;
  alignRight?: boolean;
}

export const ChartFooter: React.FC<ChartFooterProps> = ({
  text,
  scalingFactor = 1,
  transform = "",
  alignRight = false,
}) => {
  return (
    <g className="footer" transform={transform}>
      <text
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize={14 * scalingFactor}
        fontWeight="300"
        textAnchor={alignRight ? 'end' : 'start'}
        fill={chartColors.fontSecondary}
      >
        {text}
      </text>
    </g>
  );
};
