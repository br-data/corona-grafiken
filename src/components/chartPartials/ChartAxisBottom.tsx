import React from "react";

import { chartColors } from '../../config/colors';

interface ChartAxisBottomProps {
  scale: any;
  ticks: any[];
  tickFormater: any;
  showTickMarks?: boolean;
  tickMarkLength?: number;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const ChartAxisBottom: React.FC<ChartAxisBottomProps>=({
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
        x1={range[0]}
        x2={range[1]}
        fill="none"
        stroke={stroke}
      />
      {ticks.map((tick: any) => (
        <g
          key={tick}
          transform={`translate(${scale(tick)}, 0)`}
        >
          {showTickMarks &&
            <line
              y2={tickMarkLength}
              stroke={stroke}
            />
          }
          <text
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fontSize="14"
            fill={fill}
            textAnchor="middle"
            dy={showTickMarks ? "23" : "17"}
            >
            { tickFormater(tick) }
          </text>
        </g>
      ))}
    </g>
  )
}
