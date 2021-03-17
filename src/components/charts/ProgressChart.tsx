import React from "react";
import { scaleLinear } from "d3-scale";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartLegend, ChartKey } from "../chartPartials/ChartLegend";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";

import { ChartProps, ChartData } from "./ChartProps";
import { chartColors } from "../../config/colors";
import { germanDate } from "../../utils/date";

export const ProgressChart: React.FC<ChartProps> = ({
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
    top: 130 * scalingFactor,
    right: 25,
    bottom: hasLogo ? (chartLogoSize + 55) * scalingFactor : 75,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barHeight = (innerHeight / 4) * scalingFactor;

  const bavariaData: ChartData[] = chartData.find(
    (datum) => datum.key === "vaccinations-bavaria"
  )?.data!;
  const germanyData: ChartData[] = chartData.find(
    (datum) => datum.key === "vaccinations-germany"
  )?.data!;

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
          fontSize={18 * scalingFactor}
          fontWeight="400"
          fill={chartColors.fontPrimary}
        >
          Bayern:
        </text>
        <ChartGroup transform="translate(0, 8)">
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
            y={barHeight / 2 + 5}
            dx={-7 * scalingFactor}
            textAnchor="end"
            fontFamily='"Open Sans", sans-serif'
            fontSize={15 * scalingFactor}
            fontWeight="300"
            fill={chartColors.fontPrimary}
          >
            Herdenimmunität erreicht
          </text>
        </ChartGroup>
        <ChartGroup transform={`translate(0, ${10 + barHeight})`}>
          {xTicks.map((tick: any, index: number) => (
            <g key={tick} transform={`translate(${x(tick)}, 0)`}>
              <text
                fontFamily="'Open Sans', OpenSans, sans-serif"
                fontSize={14 * scalingFactor}
                fill={chartColors.fontPrimary}
                textAnchor="middle"
                dy={17 * scalingFactor}
                dx={index === 0 ? 12 : index === xTicks.length - 1 ? -20 : 0}
              >
                {xFormatter(tick)}
              </text>
            </g>
          ))}
        </ChartGroup>
      </ChartGroup>
      <ChartGroup
        transform={`translate(${margin.right}, ${
          margin.top + innerHeight / 2 + 20
        })`}
      >
        <text
          fontFamily='"Open Sans", sans-serif'
          fontSize={18 * scalingFactor}
          fontWeight="400"
          fill={chartColors.fontPrimary}
        >
          Deutschland:
        </text>
        <ChartGroup transform={`translate(0, 7)`}>
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
            y={barHeight / 2 + 5}
            dx={-7 * scalingFactor}
            textAnchor="end"
            fontFamily='"Open Sans", sans-serif'
            fontSize={15 * scalingFactor}
            fontWeight="300"
            fill={chartColors.fontPrimary}
          >
            Herdenimmunität erreicht
          </text>
        </ChartGroup>
        <ChartGroup transform={`translate(0, ${10 + barHeight})`}>
          {xTicks.map((tick: any, index: number) => (
            <g key={tick} transform={`translate(${x(tick)}, 0)`}>
              <text
                fontFamily="'Open Sans', OpenSans, sans-serif"
                fontSize={14 * scalingFactor}
                fill={chartColors.fontPrimary}
                textAnchor="middle"
                dy={17 * scalingFactor}
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
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
      <ChartLegend transform={`translate(${padding}, ${80 * scalingFactor})`}>
        <ChartKey
          text="Zweitimpfung erhalten"
          symbol="square"
          symbolFill={chartColors.green}
          scalingFactor={scalingFactor}
        />
        <ChartKey
          text="Erstimpfung erhalten"
          symbol="square"
          symbolFill="url(#diagonal-hatching)"
          scalingFactor={scalingFactor}
          transform={`translate(${200 * scalingFactor}, 0)`}
        />
        {/* <ChartKey
          text="Gesamtbevölkerung"
          symbol="square"
          symbolFill="none"
          symbolStroke={chartColors.lineSecondary}
          scalingFactor={scalingFactor}
          transform={`translate(${390 * scalingFactor}, 0)`}
        /> */}
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
