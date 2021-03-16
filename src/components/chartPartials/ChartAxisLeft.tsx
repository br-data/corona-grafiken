import React from "react";

import { chartColors } from "../../config/colors";

interface ChartAxisLeftProps {
  scale: any;
  ticks: any[];
  tickFormatter?: any;
  showTickMarks?: boolean;
  tickMarkLength?: number;
  scalingFactor?: number;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const ChartAxisLeft: React.FC<ChartAxisLeftProps> = ({
  scale,
  ticks,
  tickFormatter = (t: any) => t,
  showTickMarks = true,
  tickMarkLength = 5,
  scalingFactor = 1,
  transform = "",
  stroke = chartColors.linePrimary,
  fill = chartColors.fontPrimary,
}) => {
  return (
    <g className="axis-left" transform={transform}>
      <line
        y1={scale.range()[0]}
        y2={scale.range()[1]}
        fill="none"
        stroke={stroke}
      />
      {ticks.map((tick: any) => (
        <g key={tick} transform={`translate(0, ${scale(tick)})`}>
          {showTickMarks && <line x2={-tickMarkLength} stroke={stroke} />}
          <text
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fontSize={14 * scalingFactor}
            fill={fill}
            textAnchor="end"
            dx={showTickMarks ? "-10" : "-5"}
            dy={5 * Math.sqrt(scalingFactor)}
          >
            {tickFormatter(tick)}
          </text>
        </g>
      ))}
    </g>
  );
};
