import React from "react";

interface AxisRightProps {
  scale: any;
  ticks: any[];
  tickFormater: any;
  showTickMarks?: boolean;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const AxisRight: React.FC<AxisRightProps>=({
  scale,
  ticks,
  tickFormater = (t: any) => t,
  showTickMarks = true,
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
              x2="6"
              stroke={stroke}
            />
          }
          <text
            fill={fill} 
            fontSize="14"
            textAnchor="start"
            dx={showTickMarks ? "10" : "5"}
            dy="5"
          >
            { tickFormater(tick) }
          </text>
        </g>
      ))}
    </g>
  )
}
