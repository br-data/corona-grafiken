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
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";
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
  width: number;
  height: number;
  scalingFactor: number;
  hasLogo: boolean;
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
  width = 800,
  height = 450,
  scalingFactor = 1,
  hasLogo = false,
}) => {
  const data: DataObject[] = chartData.find((datum) => datum.key === "cases")
    ?.data;
  const smoothData: DataObject[] = sma(data);

  const margin = {
    top: 120 * scalingFactor,
    right: 25,
    bottom: hasLogo ? ((chartLogoSize + 55) * scalingFactor) : 75,
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

  const yMax = max(data, (d: DataObject): number => d.value)!;
  const y = scaleLinear()
    .domain([0, yMax * 1.1])
    .range([innerHeight, 0]);
    
  const yTicks = y.copy().nice().ticks(height < 350 ? 3 : 5 );

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  const lineConstructor = line()
    // @ts-ignore: Library types don't match
    .x(d => x(d.date) + x.bandwidth() / 2)
    // @ts-ignore: Library types don't match
    .y(d => y(d.value))
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
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
      <ChartLegend transform={`translate(25, ${(80 * scalingFactor)})`}>
        <ChartKey
          text="Neuinfektionen"
          symbol="square"
          symbolFill={chartColors.blue}
          scalingFactor={scalingFactor}
        />
        <ChartKey
          transform={`translate(${150 * scalingFactor}, 0)`}
          text="7-Tage-Mittelwert"
          symbol="dashed-line"
          symbolStroke={chartColors.white}
          symbolSize={30}
          scalingFactor={scalingFactor}
        />
      </ChartLegend>
      <ChartFooter
        text={`Quelle: ${chart.dataSource} (Stand: ${germanDate(endDate)})`}
        scalingFactor={scalingFactor}
        transform={`translate(${
          hasLogo ? width - margin.right : margin.right
        }, ${height - padding})`}
        alignRight={hasLogo}
      />
      {hasLogo && (
        <ChartLogo
          transform={`translate(${margin.right}, ${
            height - (chartLogoSize * Math.pow(scalingFactor, 2)) - padding + 5
          }) scale(${Math.pow(scalingFactor, 2)})`}
        />
      )}
    </ChartSvg>
  );
};
