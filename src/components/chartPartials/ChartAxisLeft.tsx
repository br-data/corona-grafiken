import React from "react";

import { chartColors } from '../../config/colors';

interface ChartAxisLeftProps {
  scale: any;
  ticks: any[];
  tickFormater: any;
  showTickMarks?: boolean;
  tickMarkLength?: number;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const ChartAxisLeft: React.FC<ChartAxisLeftProps>=({
  scale,
  ticks,
  tickFormater = (t: any) => t,
  showTickMarks = true,
  tickMarkLength = 5,
  transform = '',
  stroke = chartColors.linePrimary,
  fill = chartColors.fontPrimary
}) => {
  const range=scale.range();
  
  return (
    <g transform={transform}>
      <line
        y1={range[0]}
        y2={range[1]}
        fill="none"
        stroke={stroke}
      />
      {ticks.map((tick: any) => (
        <g
          key={tick}
          transform={`translate(0, ${scale(tick)})`}
        >
          {showTickMarks &&
            <line
              x2={-tickMarkLength}
              stroke={stroke}
            />
          }
          <text
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fontSize="14"
            fill={fill}
            textAnchor="end"
            dx={showTickMarks ? "-10" : "-5"}
            dy="5"
          >
            { tickFormater(tick) }
          </text>
        </g>
      ))}
    </g>
  )
}
