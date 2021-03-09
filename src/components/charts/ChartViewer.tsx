import React, { useState, useEffect } from 'react';
import { BarChart } from './BarChart'
import { ChartObject } from '../../config/config';

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ chart, startDate, endDate }) => {
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
      setChartData({
        ...chart,
        data
      });
    });
  }, []);

  if (error) {
    return <div>Error: Chart konnte nicht geladen werden</div>;
  // } else if (!isLoaded) {
  //   return <div>Lade Daten ...</div>;
  } else {
    console.log(chartData);
    
    return (
      <BarChart chartData={chartData} />
    )
  }
};
