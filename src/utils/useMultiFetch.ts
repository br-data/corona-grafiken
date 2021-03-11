import { useState, useEffect } from "react";
import { ChartObject, ChartDataObject } from "../config/charts";

export interface MultiFetchProps {
  error: Boolean;
  isLoaded: Boolean;
  chartData: ChartDataObject[];
}

export const useMultiFetch = (
  chart: ChartObject,
  startDate: string,
  endDate: string
): MultiFetchProps => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<ChartDataObject[]>([]);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    const data = (() => {
      return Promise.all(
        chart.data.map(async (datum: ChartDataObject) => {
          const realUrl = datum.url
            .replace("${startDate}", startDate)
            .replace("${endDate}", endDate);
          const response = await fetch(realUrl);
          const data = await response.json();

          return {
            ...datum,
            data,
          };
        })
      );
    })();

    data.then((data) => {
      const hasLoaded =
        data.length &&
        data.reduce(
          (acc, curr: ChartDataObject) => acc && !!curr.data.length,
          true
        );

      if (hasLoaded) {
        setChartData(data);
        setIsLoaded(true);
      } else {
        setError(true);
        setChartData([]);
        setIsLoaded(true);
      }
    });
  }, [chart, startDate, endDate]);

  return {
    error,
    isLoaded,
    chartData,
  };
};
