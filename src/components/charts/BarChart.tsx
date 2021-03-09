import React from 'react';

interface BarChartProps {
  chartData: any;
}

export const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  
  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  );
  const dataset = generateDataset();

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
}