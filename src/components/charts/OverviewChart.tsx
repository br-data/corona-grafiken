import React from "react";
import { max, min } from "d3-array";
import { scaleLinear, scaleBand } from "d3-scale";
import { area, curveMonotoneX } from "d3-shape";

import { ChartSvg } from "./partials/ChartSvg";
import { ChartGroup } from "./partials/ChartGroup";
import { ChartHeader } from "./partials/ChartHeader";
import { ChartLegend, ChartKey } from "./partials/ChartLegend";
import { ChartBackground } from "./partials/ChartBackground";
import { ChartFooter } from "./partials/ChartFooter";
import { ChartLogo, chartLogoSize } from "./partials/ChartLogo";
import { ChartAxisBottom } from "./partials/ChartAxisBottom";
import { ChartAxisGrid } from "./partials/ChartAxisGrid";

import { ChartProps, ChartData } from "./ChartProps";
import { chartColors } from "../../config/colors";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";

export const OverviewChart: React.FC<ChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width = 800,
  height = 450,
  scalingFactor = 1,
  hasLogo = false,
}) => {
  const margin = {
    top: 120 * scalingFactor,
    right: 25,
    bottom: hasLogo ? (chartLogoSize + 55) * scalingFactor : 75,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const data: ChartData[] = chartData.find(
    (datum) => datum.key === "currentCases"
  )?.data!;

  const xMin = min(data, (d: ChartData) => new Date(d.date))!;
  const xMinBracket = new Date(xMin);
  xMinBracket.setDate(xMinBracket.getDate() - 8);
  const xMax = max(data, (d: ChartData) => new Date(d.date))!;
  const xMaxBracket = new Date(xMax);
  xMaxBracket.setDate(xMaxBracket.getDate() + 8);
  const xValues = dateRange(xMinBracket, xMaxBracket, 1);
  const xTicks = dateRange(xMin, xMax, Math.floor(data.length / 6));
  const x = scaleBand()
    .paddingOuter(0)
    .paddingInner(0.4)
    .domain(xValues)
    .range([0, innerWidth]);

  const yMax = max(data, (d: ChartData): number => d.summeFall)!;
  const y = scaleLinear()
    .domain([0, yMax * 1.1])
    .range([innerHeight, 0]);
  const yTicks = y
    .copy()
    .ticks(height < 350 ? 3 : 5);

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  const recoveredCasesArea = area<ChartData>()
    .x(d => x(d.date)!)
    .y0((d) => y(d.aktuellInfiziert + d.summeTodesfall))
    .y1((d) => y(d.aktuellGenesen + d.aktuellInfiziert + d.summeTodesfall))
    .curve(curveMonotoneX);

  // add date to meldedatum
    data.forEach(d => d.date = d.meldedatum)

  const activeCasesArea = area<ChartData>()
    .x((d) => x(d.date)!)
    .y0((d) => y(d.summeTodesfall) + 1)
    .y1((d) => y(d.aktuellInfiziert + d.summeTodesfall) - 1)
    .curve(curveMonotoneX);

  const deathsArea = area<ChartData>()
    .x((d) => x(d.date)!)
    .y0(y(0))
    .y1((d) => y(d.summeTodesfall))
    .curve(curveMonotoneX);

  return (
    <ChartSvg id={chart.id} width={width} height={height}>
      <ChartBackground width={width} height={height} />
      <ChartAxisBottom
        scale={x}
        ticks={xTicks}
        tickFormatter={germanDateShort}
        showTickMarks={false}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${height - margin.bottom})`}
      />
      <ChartAxisGrid
        scale={y}
        ticks={yTicks}
        tickFormatter={germanNumber}
        tickMarkLength={innerWidth}
        stroke={chartColors.lineSecondary}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          d={recoveredCasesArea(data)!}
          stroke="none"
          fill={chartColors.green}
        />
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          d={activeCasesArea(data)!}
          stroke="none"
          fill={chartColors.blue}
        />
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          d={deathsArea(data)!}
          stroke="none"
          fill={chartColors.yellow}
        />
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
      <ChartLegend transform={`translate(25, ${80 * scalingFactor})`}>
        <ChartKey
          text="Erkrankte"
          symbol="square"
          symbolFill={chartColors.blue}
          scalingFactor={scalingFactor}
        />
        <ChartKey
          text="Genesene"
          symbol="square"
          symbolFill={chartColors.green}
          scalingFactor={scalingFactor}
          transform={`translate(${110 * scalingFactor}, 0)`}
        />
        <ChartKey
          text="Todesfälle"
          symbol="square"
          symbolFill={chartColors.yellow}
          scalingFactor={scalingFactor}
          transform={`translate(${220 * scalingFactor}, 0)`}
        />
      </ChartLegend>
      <ChartFooter
        text={`Quelle: ${chart.dataSource} (Stand: ${germanDate(endDate)})`}
        alignRight={hasLogo}
        scalingFactor={scalingFactor}
        transform={`translate(${
          hasLogo ? width - margin.right : margin.right
        }, ${height - padding})`}
      />
      {hasLogo && (
        <ChartLogo
          transform={`translate(${margin.right}, ${
            height - chartLogoSize * Math.pow(scalingFactor, 2) - padding + 5
          }) scale(${Math.pow(scalingFactor, 2)})`}
        />
      )}
    </ChartSvg>
  );
};
