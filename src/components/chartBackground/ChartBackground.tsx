import React from "react";

interface ChartBackgroundProps {
  width: number;
  height: number;
}

export const ChartBackground: React.FC<ChartBackgroundProps>=({
  width,
  height
}) => {
  return (
    <>
      <defs>
        <radialGradient id="radial-gradient">
          <stop offset=".25" stopColor="#484B5A"></stop>
          <stop offset="1" stopColor="#1D2029"></stop>
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#radial-gradient)"></rect>
    </>
  )
};