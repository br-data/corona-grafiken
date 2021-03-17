import React, { useEffect, useState } from "react";

import { BarChart } from "../charts/BarChart";
import { LineChart } from "../charts/LineChart";
import { AreaChart } from "../charts/AreaChart";
import { TileChart } from "../charts/TileChart";
import { ProgressChart } from "../charts/ProgressChart";
import { GermanyMap } from "../charts/GermanyMap";
import { BavariaMap } from "../charts/BavariaMap";
import { ChartWrapper, ChartDimensions } from "./styles.ChartViewer";

import { ChartObject } from "../../config/charts";
import { useMultiFetch, MultiFetchProps } from "../../utils/useMultiFetch";

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
  width: number;
  height: number;
  scalingFactor: number;
  hasLogo: boolean;
  setSvgDom: any;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({
  chart,
  startDate,
  endDate,
  width,
  height,
  scalingFactor,
  hasLogo,
  setSvgDom
}) => {
  const [chartState, setChartState] = useState(chart.id);
  useEffect(() => {
    setChartState(chart.id);
  }, [chart]);

  const { error, isLoaded, chartData }: MultiFetchProps = useMultiFetch(
    chart,
    startDate,
    endDate
  );

  if (error) {
    return (
      <ChartWrapper>
        <div>Fehler: Daten konnte nicht geladen werden</div>
      </ChartWrapper>
    );
  } else if (!isLoaded || chartState !== chart.id) {
    return (
      <ChartWrapper>
        <div>Lade Daten ...</div>
      </ChartWrapper>
    );
  } else {
    return (
      <>
        <ChartWrapper ref={setSvgDom}>
          {chart.type === "bar-chart" && (
            <BarChart
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "line-chart" && (
            <LineChart
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "area-chart" && (
            <AreaChart
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "bavaria-map" && (
            <BavariaMap
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "germany-map" && (
            <GermanyMap
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "tile-chart" && (
            <TileChart
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          {chart.type === "progress-chart" && (
            <ProgressChart
              chart={chart}
              chartData={chartData}
              startDate={startDate}
              endDate={endDate}
              width={width}
              height={height}
              scalingFactor={scalingFactor}
              hasLogo={hasLogo}
            />
          )}
          <ChartDimensions>
            Größe: {width} × {height} (Auflösung: {width*2} × {height*2})
          </ChartDimensions>
        </ChartWrapper>
      </>
    );
  }
};
