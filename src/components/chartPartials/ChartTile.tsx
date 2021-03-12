import React from "react";

import { chartColors } from "../../config/colors";

interface ChartTileProps {
  width?: number;
  height?: number;
  bigIndicator?: string;
  smallIndicator?: string;
  indicatorDescription?: string;
  indicatorColor?: string;
  fontColor?: string;
  tileColor?: string;
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
  transform,
}) => {
  return (
    <g className="tile" transform={transform}>
      <rect fill={tileColor} width={width} height={height} />
      <text
        x="20"
        y="30"
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="24"
        fontWeight="400"
        fill={indicatorColor}
      >
        {bigIndicator}{" "}
        { smallIndicator &&
          <tspan fontSize="15">
            ({smallIndicator})
          </tspan>
        }
      </text>
      <text
        x="20"
        y="50"
        fontFamily="'Open Sans', OpenSans, sans-serif"
        fontSize="15"
        fill={fontColor}
      >
        {indicatorDescription}
      </text>
    </g>
  );
};
