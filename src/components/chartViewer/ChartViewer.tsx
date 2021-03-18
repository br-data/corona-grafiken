import React, { useEffect, useState } from "react";

import { BarChart } from "../charts/BarChart";
import { LineChart } from "../charts/LineChart";
import { AreaChart } from "../charts/AreaChart";
import { TileChart } from "../charts/TileChart";
import { ProgressChart } from "../charts/ProgressChart";
import { Map } from "../charts/Map";
import {
  ChartWrapper,
  ChartEditable,
  ChartHint,
  ChartDimensions,
} from "./styles.ChartViewer";

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
  setSvgDom,
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

  const chartProps = {
    chart,
    chartData,
    startDate,
    endDate,
    width,
    height,
    scalingFactor,
    hasLogo,
  };

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
        <ChartWrapper>
          <ChartHint>
            Texte und Labels anklicken, um diese zu bearbeiten
          </ChartHint>
          <ChartEditable
            ref={setSvgDom}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {chart.type === "bar-chart" && <BarChart {...chartProps} />}
            {chart.type === "line-chart" && <LineChart {...chartProps} />}
            {chart.type === "area-chart" && <AreaChart {...chartProps} />}
            {chart.type === "map" && <Map {...chartProps} />}
            {chart.type === "tile-chart" && <TileChart {...chartProps} />}
            {chart.type === "progress-chart" && <ProgressChart {...chartProps} />}
          </ChartEditable>
          <ChartDimensions>
            Größe: {width} × {height} (Auflösung: {width * 2} × {height * 2})
          </ChartDimensions>
        </ChartWrapper>
      </>
    );
  }
};
