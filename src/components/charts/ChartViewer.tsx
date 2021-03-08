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
    fetch(`https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true&group=Bundesland&bundesland=Bayern`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setChartData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

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
