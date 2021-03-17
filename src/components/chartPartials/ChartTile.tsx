import React from "react";

import { chartColors } from "../../config/colors";

interface ChartTileProps {
  width: number;
  height: number;
  bigIndicator: string;
  smallIndicator?: string;
  indicatorDescription?: string;
  indicatorColor?: string;
  fontColor?: string;
  tileColor?: string;
  scalingFactor?: number;
  transform?: string;
}

export const ChartTile: React.FC<ChartTileProps> = ({
  width,
  height,
  bigIndicator,
  smallIndicator,
  indicatorDescription,
  indicatorColor = chartColors.tileFont,
  fontColor = chartColors.tileFont,
  tileColor = chartColors.tileBackground,
  scalingFactor = 1,
  transform,
}) => {
  return (
    <g className="tile" transform={transform}>
      <rect fill={tileColor} width={width} height={height} />
      <text
        transform={`translate(${20 * scalingFactor}, ${height / 2})`}
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize={24 * scalingFactor}
        fontWeight="400"
        fill={indicatorColor}
      >
        {bigIndicator}{" "}
        {smallIndicator && (
          <tspan fontSize={15 * scalingFactor}>({smallIndicator})</tspan>
        )}
      </text>
      <text
        transform={`translate(${20 * scalingFactor}, ${
          height / 2 + 20 * scalingFactor
        })`}
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontWeight="300"
        fontSize={15 * scalingFactor}
        fill={fontColor}
      >
        {indicatorDescription}
      </text>
    </g>
  );
};
