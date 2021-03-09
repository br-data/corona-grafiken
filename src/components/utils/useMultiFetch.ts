import { useState, useEffect } from "react";
import { ChartObject, ChartDataObject } from "../../config/config";

export const useMultiFetch = (
  chart: ChartObject,
  startDate: string,
  endDate: string
) => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<ChartDataObject[]>([]);

  useEffect(() => {
    const data = (() => {
      return Promise.all(
        chart.data.map(async (datum) => {
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
        data.reduce((acc, curr) => acc && !!curr.data.length, true);

      if (hasLoaded) {
        console.log(data);
        setChartData(data);
        setIsLoaded(true);
      } else {
        setError(true);
        setIsLoaded(true);
      }
    });
  }, []);

  return [error, isLoaded, chartData];
};
