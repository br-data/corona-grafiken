import React from "react";

import { chartColors, ciColors } from "../../config/colors";

interface ChartLegendProps {
  transform?: string;
}

interface ChartKeyProps {
  text: string;
  textFill?: string;
  symbol?: string;
  symbolSize?: number;
  symbolFill?: string;
  symbolStroke?: string;
  transform?: string;
}

interface SymbolProps {
  size?: number;
  fill?: string;
  stroke?: string;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  transform,
  children,
}) => {
  return (
    <g className="key" transform={transform}>
      {children}
    </g>
  );
};

export const ChartKey: React.FC<ChartKeyProps> = ({
  text,
  textFill = chartColors.white,
  symbol,
  symbolSize = 12,
  symbolFill,
  symbolStroke,
  transform,
}) => {
  return (
    <g transform={transform}>
      {symbol === "square" &&
        <SymbolSquare size={symbolSize} fill={symbolFill} stroke={symbolStroke} />
      }
      {symbol === "circle" &&
        <SymbolCircle size={symbolSize} fill={symbolFill} stroke={symbolStroke} />
      }
      {symbol === "line" &&
        <SymbolLine size={symbolSize} fill={symbolFill} stroke={symbolStroke} />
      }
      {symbol === "dashed-line" &&
        <SymbolDashedLine size={symbolSize} fill={symbolFill} stroke={symbolStroke} />
      }
      <text
        x={symbol ? (symbolSize + 7) : 0}
        dominantBaseline="hanging"
        fontFamily="'Open Sans', sans-serif"
        fontSize="15"
        fontWeight="300"
        fill={textFill}
      >
        { text }
      </text>
    </g>
  );
};

const SymbolSquare: React.FC<SymbolProps> = ({
  size,
  fill = "white",
  stroke = "none"
}) => {
  return (
    <rect
      x="0"
      y="2"
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
    />
  )
}

const SymbolCircle: React.FC<SymbolProps> = ({
  size,
  fill = "white",
  stroke = "none"
}) => {
  return (
    <circle
      r={size}
      cx={size}
      cy="10"
      fill={fill}
      stroke={stroke}
    />
  )
}

const SymbolLine: React.FC<SymbolProps> = ({
  size,
  fill = "none",
  stroke = ciColors.white
}) => {
  return (
    <path
      d={`M 0 8 L ${size} 8`}
      fill={fill}
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
    />
  )
}

const SymbolDashedLine: React.FC<SymbolProps> = ({
  size,
  fill = "none",
  stroke = ciColors.white
}) => {
  return (
    <path
      d={`M 0 8 L ${size} 8`}
      fill={fill}
      stroke={stroke}
      strokeWidth="3"
      strokeDasharray="5,5"
      strokeLinecap="round"
    />
  )
}
