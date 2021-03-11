import React from "react";

interface ChartGroupProps {
  transform?: string;
}

export const ChartGroup: React.FC<ChartGroupProps> = ({
  transform,
  children,
}) => {
  return (
    <g className="key" transform={transform}>
      {children}
    </g>
  );
};
