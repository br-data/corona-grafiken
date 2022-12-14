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
/*
    // old version
    (async () => {
      const data = await Promise.all(
        chart.data.map(async (datum: ChartDataObject) => {
          const realUrl = datum.url
            .replace("${startDate}", startDate)
            .replace("${endDate}", endDate);
          const response = await fetch(realUrl);
          const data = datum.filetype === "csv" ? await response.text() : await response.json();
          const parsedData = datum.filetype === "csv" ? csvToJson(data) : data;
          return {
            ...datum,
            data: parsedData,
          };
        })
      );
*/
    let date = new Date;
    date.setDate(date.getDate() -1);
    date.toJSON().slice(0, 10);
    let yesterday = date.toISOString().split("T")[0];

      // new version
          (async () => {
      const data = await Promise.all(
        chart.data.map(async (datum: ChartDataObject) => {
          const realUrl = datum.url
            //.replace("${startDate}", startDate)
            //.replace("${endDate}", endDate);
          const response = await fetch(realUrl);
          const data = datum.filetype === "csv" ? await response.text() : await response.text(); //hier beides auf text gestellt. Benötige ich json noch?
          const parsedData = datum.filetype === "csv" ? csvToJson(data) : csvToJson(data); //hier beides auf csvToJson gestellt. Benötige ich json noch?
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
