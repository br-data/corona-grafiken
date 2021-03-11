import React from "react";

import { chartColors } from '../../config/colors';

interface ChartAxisGridProps {
  scale: any;
  ticks: any[];
  tickFormater?: any;
  showTickMarks?: boolean;
  tickMarkLength?: number;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const ChartAxisGrid: React.FC<ChartAxisGridProps>=({
  scale,
  ticks,
  tickFormater = (t: any) => t,
  showTickMarks = true,
  tickMarkLength = 5,
  transform = '',
  stroke = chartColors.linePrimary,
  fill = chartColors.fontPrimary
}) => {

  
  return (
    <g transform={transform}>
      {ticks.map((tick: any) => (
        <g
          key={tick}
          transform={`translate(0, ${scale(tick)})`}
        >
          {showTickMarks &&
            <line
              x2={tickMarkLength}
              stroke={stroke}
            />
          }
          <text
            fontFamily="'Open Sans', OpenSans, sans-serif"
            fontSize="14"
            fill={fill} 
            textAnchor="start"
            dx="0"
            dy="-4"
          >
            { tickFormater(tick) }
          </text>
        </g>
      ))}
    </g>
  )
}
