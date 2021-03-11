import React from "react";
import { max, min } from "d3-array";
import { scaleLinear, scaleBand } from "d3-scale";
import { line, curveMonotoneX } from "d3-shape";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartLegend, ChartKey } from "../chartPartials/ChartLegend";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartAxisBottom } from "../chartPartials/ChartAxisBottom";
import { ChartAxisGrid } from "../chartPartials/ChartAxisGrid";

import { ChartObject, ChartDataObject } from "../../config/charts";
import { chartColors } from "../../config/colors";
import { sma } from "../../utils/sma";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";

interface BarChartProps {
  chart: ChartObject;
  chartData: ChartDataObject[];
  startDate: string;
  endDate: string;
}

interface DataObject {
  date: string;
  value: number;
  [key: string]: any;
}

export const BarChart: React.FC<BarChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
}) => {
  const data: DataObject[] = chartData.find((datum) => datum.key === "cases")
    ?.data;
  const smoothData: DataObject[] = sma(data);

  const margin = { top: 130, right: 25, bottom: 75, left: 25 };
  const width = 800;
  const height = 450;
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

  const yMax = max(data, (d: DataObject): number => d.value)!;
  const y = scaleLinear()
    .domain([0, yMax * 1.1])
    .range([innerHeight, 0]);
  const yTicks = y.copy().nice().ticks(5);

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  const lineConstructor = line()
    // @ts-ignore: Library types don't match
    .x((d) => x(d.date) + x.bandwidth() / 2)
    // @ts-ignore: Library types don't match
    .y((d) => y(d.value))
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
        {data.map((d: DataObject, index: number) => (
          <rect
            key={index}
            x={x(d.date)}
            y={y(d.value)}
            width={x.bandwidth()}
            height={innerHeight - y(d.value)}
            fill={chartColors.blue}
          ></rect>
        ))}
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          // @ts-ignore: Library types don't match
          d={lineConstructor(smoothData)}
          fill="none"
          stroke={chartColors.white}
          strokeWidth="3"
          strokeDasharray="10,10"
          strokeLinecap="round"
        ></path>
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        transform={`translate(${margin.right}, 40)`}
      />
      <ChartLegend transform={`translate(25, 90)`}>
        <ChartKey
          text="Neuinfektionen"
          symbol="square"
          symbolFill={chartColors.blue}
        />
        <ChartKey
          transform={`translate(150, 0)`}
          text="7-Tage-Mittelwert"
          symbol="dashed-line"
          symbolStroke={chartColors.white}
          symbolSize={30}
        />
      </ChartLegend>
      <ChartFooter
        text={`Quelle: ${chart.dataSource} (Stand: ${germanDate(endDate)})`}
        transform={`translate(${margin.right}, ${height - 25})`}
      />
    </ChartSvg>
  );
};
