import React from 'react';
import { BarChart } from './BarChart'
import { useMultiFetch } from '../utils/useMultiFetch'
import { ChartObject } from '../../config/config';

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ chart, startDate, endDate }) => {
  const [error, isLoaded, chartData] = useMultiFetch(chart, startDate, endDate);

  if (error) {
    return <div>Error: Chart konnte nicht geladen werden</div>;
  } else if (!isLoaded) {
    return <div>Lade Daten ...</div>;
  } else {
    return (
      <BarChart chartData={chartData} />
    )
  }
};
