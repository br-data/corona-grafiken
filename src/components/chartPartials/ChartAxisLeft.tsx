import React from "react";

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
  stroke = 'white',
  fill = 'white'
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
            fill={fill} 
            fontSize="14"
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
