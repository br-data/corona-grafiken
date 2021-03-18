import React from "react";
import { max, min } from "d3-array";
import { scaleLinear, scaleBand } from "d3-scale";
import { line, area, curveMonotoneX } from "d3-shape";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartLegend, ChartKey } from "../chartPartials/ChartLegend";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";
import { ChartAxisBottom } from "../chartPartials/ChartAxisBottom";
import { ChartAxisGrid } from "../chartPartials/ChartAxisGrid";

import { ChartProps, ChartData } from "./ChartProps";
import { chartColors } from "../../config/colors";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";

export const LineChart: React.FC<ChartProps> = ({
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

  const data: ChartData[] = chartData.find((datum) => datum.key === "patients")
    ?.data!;

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

  const yMax = max(data, (d: ChartData): number => d.faelleCovidAktuell)!;
  const y = scaleLinear()
    .domain([0, yMax * 1.2])
    .range([innerHeight, 0]);
  const yTicks = y
    .copy()
    .ticks(height < 350 ? 3 : 5);

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  const lineConstructor = line<ChartData>()
    .x((d) => x(d.date)! + x.bandwidth() / 2)
    .y((d) => y(d.faelleCovidAktuell))
    .curve(curveMonotoneX);

  const areaConstructor = area<ChartData>()
    .x((d) => x(d.date)!)
    .y0(() => innerHeight)
    .y1((d) => y(d.faelleCovidAktuell))
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
          d={lineConstructor(data)!}
          fill="none"
          stroke={chartColors.red}
          strokeWidth="3"
          strokeLinecap="round"
        ></path>
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          d={areaConstructor(data)!}
          stroke="none"
          fill={chartColors.red}
          fillOpacity="0.5"
        ></path>
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
      <ChartLegend transform={`translate(${padding}, ${80 * scalingFactor})`}>
        <ChartKey
          text="Intensivpatienten"
          symbol="square"
          symbolFill={chartColors.red}
          scalingFactor={scalingFactor}
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
