import React from "react";

import { chartColors } from "../../config/colors";

interface ChartAxisRightProps {
  scale: any;
  ticks: any[];
  tickFormatter?: any;
  showTickMarks?: boolean;
  tickMarkLength?: number;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const ChartAxisRight: React.FC<ChartAxisRightProps> = ({
  scale,
  ticks,
  tickFormatter = (t: any) => t,
  showTickMarks = true,
  tickMarkLength = 5,
  transform = "",
  stroke = chartColors.linePrimary,
  fill = chartColors.fontPrimary,
}) => {
  return (
    <g className="axis-right" transform={transform}>
      <line
        y1={scale.range()[0]}
        y2={scale.range()[1]}
        fill="none"
        stroke={stroke}
      />
      {ticks.map((tick: any) => (
        <g key={tick} transform={`translate(0, ${scale(tick)})`}>
          {showTickMarks && <line x2={tickMarkLength} stroke={stroke} />}
          <text
            fontSize="14"
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fill={fill}
            textAnchor="start"
            dx={showTickMarks ? "10" : "5"}
            dy="5"
          >
            {tickFormatter(tick)}
          </text>
        </g>
      ))}
    </g>
  );
};
