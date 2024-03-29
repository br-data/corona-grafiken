import { useState, useEffect } from "react";

import { csvToJson } from "./csvToJson"
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
  const [chartData, setChartData] = useState<ChartDataObject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setChartData([]);
    setIsLoaded(false);
    setError(false);

          (async () => {
      const data = await Promise.all(
        chart.data.map(async (datum: ChartDataObject) => {
          const realUrl = datum.url
                .replace("${startDate}", startDate)
          const response = await fetch(realUrl);
          const data = await response.text();
          const parsedData = csvToJson(data);
          return {
            ...datum,
            data: parsedData,
          };
        })
      );


      const hasLoaded =
        data.length &&
        data.reduce(
          (acc, curr: ChartDataObject) => acc && !!curr.data?.length,
          true
        );

      setChartData(hasLoaded ? data : []);
      setIsLoaded(!!hasLoaded);
      setError(!hasLoaded);
    })();
  }, [chart, startDate, endDate]);

  return {
    error,
    isLoaded,
    chartData,
  };
};
