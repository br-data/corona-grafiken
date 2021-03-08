import React from 'react';
import { ChartObject } from '../../config/config';

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ chart, startDate, endDate }) => {
  console.log(chart);
  
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
};