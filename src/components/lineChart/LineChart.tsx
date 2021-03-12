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

import { ChartObject, ChartDataObject } from "../../config/charts";
import { chartColors } from "../../config/colors";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";

interface LineChartProps {
  chart: ChartObject;
  chartData: ChartDataObject[];
  startDate: string;
  endDate: string;
  width: number;
  height: number;
  hasLogo: boolean;
}

interface DataObject {
  date: string;
  value: number;
  [key: string]: any;
}

export const LineChart: React.FC<LineChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width,
  height,
  hasLogo,
}) => {
  const data: DataObject[] = chartData.find((datum) => datum.key === "patients")
    ?.data;

  const margin = {
    top: 140,
    right: 25,
    bottom: hasLogo ? chartLogoSize + 60 : 75,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xMin = min(data, (d: DataObject) => new Date(d.date))!;
  const xMinBracket = new Date(xMin);
  xMinBracket.setDate(xMinBracket.getDate() - 8);
  const xMax = max(data, (d: DataObject) => new Date(d.date))!;
  const xMaxBracket = new Date(xMax);
  xMaxBracket.setDate(xMaxBracket.getDate() + 8);
  const xValues = dateRange(xMinBracket, xMaxBracket, 1);
  const xTicks = dateRange(xMin, xMax, Math.floor(data.length / 6));
  const x = scaleBand()
    .paddingOuter(0)
    .paddingInner(0.4)
    .domain(xValues)
    .range([0, innerWidth]);

  const yMax = max(data, (d: DataObject): number => d.faelleCovidAktuell)!;
  const y = scaleLinear()
    .domain([0, yMax * 1.1])
    .range([innerHeight, 0]);
  const yTicks = y.copy().nice().ticks(5);

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  // @ts-ignore: Library types don't match
  const lineConstructor = line()
    // @ts-ignore: Library types don't match
    .x((d) => x(d.date) + x.bandwidth() / 2)
    // @ts-ignore: Library types don't match
    .y((d) => y(d.faelleCovidAktuell))
    .curve(curveMonotoneX);

  // @ts-ignore: Library types don't match
  const areaConstructor = area()
    // @ts-ignore: Library types don't match
    .x((d) => x(d.date))
    // @ts-ignore: Library types don't match
    .y0(() => innerHeight)
    // @ts-ignore: Library types don't match
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
        transform={`translate(${margin.right}, ${height - margin.bottom})`}
      />
      <ChartAxisGrid
        scale={y}
        ticks={yTicks}
        tickFormatter={germanNumber}
        tickMarkLength={innerWidth}
        stroke={chartColors.lineSecondary}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          // @ts-ignore: Library types don't match
          d={lineConstructor(data)}
          fill="none"
          stroke={chartColors.red}
          strokeWidth="3"
          strokeLinecap="round"
        ></path>
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          // @ts-ignore: Library types don't match
          d={areaConstructor(data)}
          stroke="none"
          fill={chartColors.red}
          fillOpacity="0.5"
        ></path>
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        transform={`translate(${margin.right}, 40)`}
      />
      <ChartLegend transform={`translate(25, 90)`}>
        <ChartKey
          text="Intensivpatienten"
          symbol="square"
          symbolFill={chartColors.red}
        />
      </ChartLegend>
      <ChartFooter
        text={`Quelle: ${chart.dataSource} (Stand: ${germanDate(endDate)})`}
        transform={`translate(${
          hasLogo ? width - margin.right : margin.right
        }, ${height - padding})`}
        alignRight={hasLogo}
      />
      {hasLogo && (
        <ChartLogo
          transform={`translate(${margin.right}, ${
            height - chartLogoSize - padding + 5
          })`}
        />
      )}
    </ChartSvg>
  );
};