import React from "react";

interface ChartFooterProps {
  text: string;
  transform: string;
}

export const ChartFooter: React.FC<ChartFooterProps>=({
  text,
  transform = ''
}) => {
  return (
    <g className="footer" transform={transform}>
      <text
        fontFamily="'Open Sans', sans-serif"
        fontSize="14"
        fontWeight="300"
        fill="#9fa3b3"
      >
        {text}
      </text>
    </g>
  )
};