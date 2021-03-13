import React from "react";

interface ChartGroupProps {
  id?: string;
  className?: string;
  transform?: string;
}

export const ChartGroup: React.FC<ChartGroupProps> = ({
  id,
  className,
  transform,
  children,
}) => {
  return (
    <g id={id} className={className} transform={transform}>
      {children}
    </g>
  );
};
