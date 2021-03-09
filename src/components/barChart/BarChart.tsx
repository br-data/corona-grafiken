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
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 677 380.8125"
      width="677"
      height="380.8125"
      id="bayern-cases-chart-2021-03-09"
    >
      <defs>
        <radialGradient id="radial-gradient">
          <stop offset=".25" stopColor="#484B5A"></stop>
          <stop offset="1" stopColor="#1D2029"></stop>
        </radialGradient>
      </defs>
      <rect width="677" height="380.8125" fill="url(#radial-gradient)"></rect>
      <g className="axes" transform="translate(25, 130)"></g>
      <g className="bars" transform="translate(25, 130)">
        <rect
          x="12.743902439024389"
          y="175.4544297352342"
          width="0.9557926829268291"
          height="0.35807026476578585"
          fill="#0b9fd8"
        ></rect>
      </g>
      <g className="line" transform="translate(25, 130)">
        <path
          d=""
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="10,10"
          strokeLinecap="round"
        ></path>
      </g>
      <g className="header" transform="translate(25, 40)">
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
      <g className="footer" transform="translate(25, 355.8125)">
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
