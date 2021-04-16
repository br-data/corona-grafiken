import React from "react";

interface ChartSvgProps {
  id?: string;
  width?: number;
  height?: number;
}

export const ChartSvg: React.FC<ChartSvgProps> = ({
  id,
  width,
  height,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      id={id}
    >
      {children}
    </svg>
  );
};
