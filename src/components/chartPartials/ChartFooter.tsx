import React from "react";

import { chartColors } from "../../config/colors";

interface ChartFooterProps {
  text: string;
  transform: string;
}

export const ChartFooter: React.FC<ChartFooterProps> = ({
  text,
  transform = "",
}) => {
  return (
    <g className="footer" transform={transform}>
      <text
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="14"
        fontWeight="300"
        fill={chartColors.fontSecondary}
      >
        {text}
      </text>
    </g>
  );
};
