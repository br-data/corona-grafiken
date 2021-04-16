import React from "react";

import { chartColors } from "../../../config/colors";

interface ChartAxisBottomProps {
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

export const ChartAxisBottom: React.FC<ChartAxisBottomProps> = ({
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
    <g className="axis-bottom" transform={transform}>
      <line
        x1={scale.range()[0]}
        x2={scale.range()[1]}
        fill="none"
        stroke={stroke}
      />
      {ticks.map((tick: any) => (
        <g key={tick} transform={`translate(${scale(tick)}, 0)`}>
          {showTickMarks && <line y2={tickMarkLength * scalingFactor} stroke={stroke} />}
          <text
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fontSize={14 * scalingFactor}
            fill={fill}
            textAnchor="middle"
            dy={showTickMarks ? (23 * scalingFactor) : 17 * Math.sqrt(scalingFactor)}
          >
            {tickFormatter(tick)}
          </text>
        </g>
      ))}
    </g>
  );
};
