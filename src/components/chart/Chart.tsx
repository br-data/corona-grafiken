import React from 'react';

interface ChartProps {
  chartType: string;
  startDate: string;
  endDate: string;
}

export const Chart: React.FC<ChartProps> = ({ chartType, startDate, endDate }) => {
  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  );
  const dataset = generateDataset();

  console.log(chartType, startDate, endDate);

  return (
    <svg viewBox="0 0 100 50">
      {dataset.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
        />
      ))}
    </svg>
  );
};
