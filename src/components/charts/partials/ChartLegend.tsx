import React from "react";

import { chartColors, ciColors } from "../../../config/colors";

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
  scalingFactor?: number;
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
  scalingFactor = 1,
  transform,
}) => {
  return (
    <g transform={transform}>
      {symbol === "square" && (
        <SymbolSquare
          size={symbolSize}
          fill={symbolFill}
          stroke={symbolStroke}
        />
      )}
      {symbol === "circle" && (
        <SymbolCircle
          size={symbolSize}
          fill={symbolFill}
          stroke={symbolStroke}
        />
      )}
      {symbol === "line" && (
        <SymbolLine size={symbolSize} fill={symbolFill} stroke={symbolStroke} />
      )}
      {symbol === "dashed-line" && (
        <SymbolDashedLine
          size={symbolSize}
          fill={symbolFill}
          stroke={symbolStroke}
        />
      )}
      <text
        x={symbol ? (symbol === "circle" ? symbolSize * 2 : symbolSize) + 7 : 0}
        dy={13 * Math.sqrt(scalingFactor)}
        fontFamily="'Open Sans', sans-serif"
        fontSize={15 * scalingFactor}
        fontWeight="300"
        fill={textFill}
      >
        {text}
      </text>
    </g>
  );
};

const SymbolSquare: React.FC<SymbolProps> = ({
  size,
  fill = "white",
  stroke = "none",
}) => {
  return (
    <rect x="0" y="1" width={size} height={size} fill={fill} stroke={stroke} />
  );
};

const SymbolCircle: React.FC<SymbolProps> = ({
  size,
  fill = "white",
  stroke = "none",
}) => {
  return <circle r={size} cx={size} cy="7" fill={fill} stroke={stroke} />;
};

const SymbolLine: React.FC<SymbolProps> = ({
  size,
  fill = "none",
  stroke = ciColors.white,
}) => {
  return (
    <path
      d={`M 0 7 L ${size} 7`}
      fill={fill}
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
};

const SymbolDashedLine: React.FC<SymbolProps> = ({
  size,
  fill = "none",
  stroke = ciColors.white,
}) => {
  return (
    <path
      d={`M 0 7 L ${size} 7`}
      fill={fill}
      stroke={stroke}
      strokeWidth="3"
      strokeDasharray="5,5"
      strokeLinecap="round"
    />
  );
};
