import React from "react";

interface AxisBottomProps {
  scale: any;
  ticks: any[];
  tickFormater: any;
  showTickMarks?: boolean;
  transform?: string;
  stroke?: string;
  fill?: string;
}

export const AxisBottom: React.FC<AxisBottomProps>=({
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
              y2="6"
              stroke={stroke}
            />
          }
          <text
            fill={fill} 
            fontSize="14"
            textAnchor="middle"
            dy={showTickMarks ? "20" : "15"}
            >
            { tickFormater(tick) }
          </text>
        </g>
      ))}
    </g>
  )
}
