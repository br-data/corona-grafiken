import React from "react";
import { select } from 'd3-selection';
import { max, min } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisRight, axisBottom } from 'd3-axis';

import { sma } from "../../utils/sma";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";
import { ChartObject, ChartDataObject } from "../../config/config";

interface BarChartProps {
  chart: ChartObject;
  chartData: ChartDataObject[];
  startDate: string;
  endDate: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
}) => {
  const data = chartData.filter(datum => datum.key === 'cases')[0].data;
  const smoothData = sma(data);

  const margin = { top: 130, right: 25, bottom: 75, left: 25 }
  const width = 800;
  const height = 450;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xMin: Date = min(data, (d: any) => new Date(d.date))!;
  const xMinBracket = new Date(xMin);
  xMinBracket.setDate(xMinBracket.getDate() - 8);

  const xMax: Date = max(data, (d: any) => new Date(d.date))!;
  const xMaxBracket = new Date(xMax);
  xMaxBracket.setDate(xMaxBracket.getDate() + 8);

  const xValues = dateRange(xMinBracket, xMaxBracket, 1);
  const xTicks = dateRange(xMin, xMax, Math.floor(data.length / 6));

  const x = scaleBand()
    .paddingOuter(0)
    .paddingInner(.4)
    .domain(xValues)
    .range([0, innerWidth]);
  
  // Calculate vertical scale and axis
  const yMax: number = max(data, (d: any): number => d.value)!;

  const y = scaleLinear()
    .domain([0, yMax * 1.1])
    .range([innerHeight, 0]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      id={chart.id}
    >
      <defs>
        <radialGradient id="radial-gradient">
          <stop offset=".25" stopColor="#484B5A"></stop>
          <stop offset="1" stopColor="#1D2029"></stop>
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#radial-gradient)"></rect>
      <g className="axes" transform={`translate(${margin.right}, ${margin.top})`}></g>
      <g className="bars" transform={`translate(${margin.right}, ${margin.top})`}>
        {data.map((d: any) => (
          <rect
            x={x(d.date)}
            y={y(d.value)}
            width={x.bandwidth()}
            height={innerHeight - y(d.value)}
            fill="#0b9fd8"
          ></rect>
        ))}
      </g>
      <g className="line" transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          d=""
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="10,10"
          strokeLinecap="round"
        ></path>
      </g>
      <g className="header" transform={`translate(${margin.right}, 40)`}>
        <text
          x="0"
          y="0"
          fontFamily="'Open Sans', sans-serif"
          fontSize="24"
          fontWeight="600"
          fill="#ffffff"
        >
          Neue Coronafälle in Bayern
        </text>
        <text
          x="0"
          y="25"
          fontFamily="'Open Sans', sans-serif"
          fontSize="15"
          fontWeight="300"
          fill="#9fa3b3"
        >
          Entwicklung der Neuinfektionen nach Erkrankungsdatum
        </text>
      </g>
      <g className="key" transform="translate(25, 90)">
        <rect x="0" y="2" width="12" height="12" fill="#0b9fd8"></rect>
        <text
          x="20"
          dominantBaseline="hanging"
          fontFamily="'Open Sans', sans-serif"
          fontSize="15"
          fontWeight="300"
          fill="#ffffff"
        >
          Neuinfektionen
        </text>
        <path
          d="M 155 8 L 185 8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="5,5"
          strokeLinecap="round"
        ></path>
        <text
          x="190"
          dominantBaseline="hanging"
          fontFamily="'Open Sans', sans-serif"
          fontSize="15"
          fontWeight="300"
          fill="#ffffff"
        >
          7-Tage-Mittelwert
        </text>
      </g>
      <g className="footer" transform={`translate(${margin.right}, ${height - 25})`}>
        <text
          fontFamily="'Open Sans', sans-serif"
          fontSize="14"
          fontWeight="300"
          fill="#9fa3b3"
        >
          Grafik: BR, Daten: Robert Koch-Institut, BR-Analyse (Stand: 9. März
          2021)
        </text>
      </g>
    </svg>
  );
};
