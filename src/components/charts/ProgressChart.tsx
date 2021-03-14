import React from "react";
import { scaleLinear } from "d3-scale";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartLegend, ChartKey } from "../chartPartials/ChartLegend";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";

import { ChartObject, ChartDataObject } from "../../config/charts";
import { chartColors } from "../../config/colors";
import { germanDate } from "../../utils/date";

interface ProgressChartProps {
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

export const ProgressChart: React.FC<ProgressChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width,
  height,
  hasLogo,
}) => {
  const bavariaData: DataObject[] = chartData.find(
    (datum) => datum.key === "vaccinations-bavaria"
  )?.data;

  const germanyData: DataObject[] = chartData.find(
    (datum) => datum.key === "vaccinations-germany"
  )?.data;

  const margin = {
    top: 150,
    right: 25,
    bottom: hasLogo ? chartLogoSize + 60 : 90,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barHeight = innerHeight / 4;

  const x = scaleLinear().domain([0, 100]).range([0, innerWidth]);
  const xTicks = x.ticks(5);
  const xFormatter = (d: number) => `${d} %`;

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  return (
    <ChartSvg id={chart.id} width={width} height={height}>
      <defs>
        <linearGradient id="linear-gradient">
          <stop
            offset=".6"
            stopColor={chartColors.lineSecondary}
            stopOpacity="0"
          ></stop>
          <stop
            offset="1"
            stopColor={chartColors.lineSecondary}
            stopOpacity="1"
          ></stop>
        </linearGradient>
        <pattern
          id="diagonal-hatching"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
            stroke={chartColors.green}
            stopOpacity="0"
          ></path>
        </pattern>
      </defs>
      <ChartBackground width={width} height={height} />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <text
          fontFamily='"Open Sans", sans-serif'
          fontSize="20"
          fontWeight="600"
          fill={chartColors.fontPrimary}
        >
          Bayern:
        </text>
        <ChartGroup transform="translate(0, 10)">
          <rect
            width={x(100)}
            height={barHeight}
            stroke={chartColors.lineSecondary}
            strokeWidth="1"
            fill="url(#linear-gradient)"
          ></rect>
          <rect
            width={x(bavariaData[bavariaData.length - 1]["impf_quote_erst"])}
            height={barHeight}
            fill="url(#diagonal-hatching)"
          >
            <title>{`${germanNumber(
              bavariaData[bavariaData.length - 1]["personen_erst_kumulativ"]
            )} (${germanNumber(
              bavariaData[bavariaData.length - 1]["impf_quote_erst"]
            )} %)`}</title>
          </rect>
          <rect
            width={x(bavariaData[bavariaData.length - 1]["impf_quote_voll"])}
            height={barHeight}
            fill={chartColors.green}
          >
            <title>
              `$
              {germanNumber(
                bavariaData[bavariaData.length - 1]["personen_voll_kumulativ"]
              )}{" "}
              ($
              {germanNumber(
                bavariaData[bavariaData.length - 1]["impf_quote_voll"]
              )}{" "}
              %)`
            </title>
          </rect>
          <text
            x={x(100)}
            y={(barHeight / 2) + 5}
            dx="-7"
            textAnchor="end"
            fontFamily='"Open Sans", sans-serif'
            fontSize="15"
            fontWeight="300"
            fill={chartColors.fontPrimary}
          >
            Herdenimmunität erreicht
          </text>
        </ChartGroup>
        <ChartGroup transform={`translate(0, ${ 10 + barHeight })`}>
          {xTicks.map((tick: any, index: number) => (
            <g key={tick} transform={`translate(${x(tick)}, 0)`}>
              <text
                fontFamily="'Open Sans', OpenSans, sans-serif"
                fontSize="14"
                fill={chartColors.fontPrimary}
                textAnchor="middle"
                dy="17"
                dx={(index === 0) ? 12 : ((index === xTicks.length - 1) ? -20 : 0)}
              >
                {xFormatter(tick)}
              </text>
            </g>
          ))}
        </ChartGroup>
      </ChartGroup>
      <ChartGroup
        transform={`translate(${margin.right}, ${margin.top + (innerHeight / 2) + 20})`}
      >
        <text
          fontFamily='"Open Sans", sans-serif'
          fontSize="20"
          fontWeight="600"
          fill={chartColors.fontPrimary}
        >
          Deutschland:
        </text>
        <ChartGroup transform={`translate(0, 10)`}>
          <rect
            width={x(100)}
            height={barHeight}
            stroke={chartColors.lineSecondary}
            strokeWidth="1"
            fill="url(#linear-gradient)"
          ></rect>
          <rect
            width={x(germanyData[germanyData.length - 1]["impf_quote_erst"])}
            height={barHeight}
            fill="url(#diagonal-hatching)"
          >
            <title>{`${germanNumber(
              germanyData[germanyData.length - 1]["personen_erst_kumulativ"]
            )} (${germanNumber(
              germanyData[germanyData.length - 1]["impf_quote_erst"]
            )} %)`}</title>
          </rect>
          <rect
            width={x(germanyData[germanyData.length - 1]["impf_quote_voll"])}
            height={barHeight}
            fill={chartColors.green}
          >
            <title>
              `$
              {germanNumber(
                germanyData[germanyData.length - 1]["personen_voll_kumulativ"]
              )}{" "}
              ($
              {germanNumber(
                germanyData[germanyData.length - 1]["impf_quote_voll"]
              )}{" "}
              %)`
            </title>
          </rect>
          <text
            x={x(100)}
            y={(barHeight / 2) + 5}
            dx="-7"
            textAnchor="end"
            fontFamily='"Open Sans", sans-serif'
            fontSize="15"
            fontWeight="300"
            fill={chartColors.fontPrimary}
          >
            Herdenimmunität erreicht
          </text>
        </ChartGroup>
        <ChartGroup transform={`translate(0, ${ 10 + barHeight })`}>
          {xTicks.map((tick: any, index: number) => (
            <g key={tick} transform={`translate(${x(tick)}, 0)`}>
              <text
                fontFamily="'Open Sans', OpenSans, sans-serif"
                fontSize="14"
                fill={chartColors.fontPrimary}
                textAnchor="middle"
                dy="17"
                dx={index === 0 ? 12 : index === xTicks.length - 1 ? -24 : 0}
              >
                {xFormatter(tick)}
              </text>
            </g>
          ))}
        </ChartGroup>
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        transform={`translate(${margin.right}, 40)`}
      />
      <ChartLegend transform={`translate(25, 90)`}>
        <ChartKey
          text="Zweitimpfung erhalten"
          symbol="square"
          symbolFill={chartColors.green}
        />
        <ChartKey
          transform={`translate(200, 0)`}
          text="Erstimpfung erhalten"
          symbol="square"
          symbolFill="url(#diagonal-hatching)"
        />
        <ChartKey
          transform={`translate(390, 0)`}
          text="Gesamtbevölkerung"
          symbol="square"
          symbolFill="none"
          symbolStroke={chartColors.lineSecondary}
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
