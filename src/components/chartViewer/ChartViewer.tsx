import React, { useEffect } from "react";
import { ChartWrapper } from "./styles.ChartView";
import { BarChart } from "../barChart/BarChart";
import { useMultiFetch, MultiFetchProps } from "../../utils/useMultiFetch";
import { ChartObject } from "../../config/charts";

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
  width: number;
  height: number;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({
  chart,
  startDate,
  endDate,
  width,
  height,
}) => {
  const { error, isLoaded, chartData }: MultiFetchProps = useMultiFetch(
    chart,
    startDate,
    endDate
  );

  useEffect(() => {
    console.log(isLoaded);
  }, [isLoaded]);

  // useEffect(() => {
  //   console.log(width, height);
  // }, [width, height]);

  // console.log(isLoaded);
  
  if (error) {
    return (
      <ChartWrapper>
        <div>Fehler: Daten konnte nicht geladen werden</div>
      </ChartWrapper>
    );
  } else if (!isLoaded) {
    return (
      <ChartWrapper>
        <div>Lade Daten ...</div>
      </ChartWrapper>
    );
  } else {
    return (
      <ChartWrapper>
        <BarChart
          chart={chart}
          chartData={chartData}
          startDate={startDate}
          endDate={endDate}
          width={width}
          height={height}
        />
      </ChartWrapper>
    );
  }
};
