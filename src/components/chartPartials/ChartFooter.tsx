import React from "react";

import { chartColors } from "../../config/colors";

interface ChartFooterProps {
  text: string;
  transform: string;
  alignRight: boolean;
}

export const ChartFooter: React.FC<ChartFooterProps> = ({
  text,
  transform = "",
  alignRight = false,
}) => {
  return (
    <g className="footer" transform={transform}>
      <text
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="15"
        fontWeight="300"
        textAnchor={alignRight ? 'end' : 'start'}
        fill={chartColors.fontSecondary}
      >
        {text}
      </text>
    </g>
  );
};
