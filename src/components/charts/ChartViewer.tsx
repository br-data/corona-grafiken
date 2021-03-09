import React, { useState, useEffect } from 'react';
import { BarChart } from './BarChart'
import { ChartObject, ChartDataObject } from '../../config/config';

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ chart, startDate, endDate }) => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<ChartDataObject[]>([]);

  useEffect(() => {
    const data = (() => {
      return Promise.all(chart.data.map(async (datum) => {
        const realUrl = datum.url
          .replace('${startDate}', startDate)
          .replace('${endDate}', endDate)
        const response = await fetch(realUrl);
        const data = await response.json();

        return {
          ...datum,
          data
        };
      }));
    })();

    data.then(data => {
      const hasLoaded = data.length && data.reduce(
        (acc, curr) => acc && !!curr.data.length
      , true);

      if (hasLoaded) {
        console.log(data);
        setChartData(data);
        setIsLoaded(true)
      } else {
        setError(true)
        setIsLoaded(true)
      }
    });
  }, []);

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
