import React from "react";
import { scaleBand } from "d3-scale";

import { ChartSvg } from "./partials/ChartSvg";
import { ChartGroup } from "./partials/ChartGroup";
import { ChartHeader } from "./partials/ChartHeader";
import { ChartBackground } from "./partials/ChartBackground";
import { ChartFooter } from "./partials/ChartFooter";
import { ChartLogo, chartLogoSize } from "./partials/ChartLogo";
import { ChartTile } from "./partials/ChartTile";

import { ChartProps, ChartData } from "./ChartProps";
import { chartColors } from "../../config/colors";
import { germanDate } from "../../utils/date";
import { weekTrend } from "../../utils/weekTrend";

export const TileChart: React.FC<ChartProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width = 800,
  height = 450,
  scalingFactor = 1,
  hasLogo = false,
}) => {
  const caseData: ChartData[] = chartData.find((datum) => datum.key === "cases")
    ?.data!;
  const recoveredData: ChartData[] = chartData.find(
    (datum) => datum.key === "recoveries"
  )?.data!;
  const deathData: ChartData[] = chartData.find(
    (datum) => datum.key === "deaths"
  )?.data!;

  const margin = {
    top: 90 * scalingFactor,
    right: 25,
    bottom: hasLogo ? (chartLogoSize + 45) * scalingFactor : 65,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xGrid = height >= width ? ["A"] : ["A", "B"];
  const xPadding =
    height >= width ? 0 : ((0.1 * height) / width) * scalingFactor;
  const x = scaleBand()
    .domain(xGrid)
    .range([0, innerWidth])
    .paddingInner(xPadding);

  const yGrid = height >= width ? ["1", "2", "3", "4"] : ["1", "2"];
  const yPadding =
    (((height >= width ? 0.2 : 0.1) * width) / height) * scalingFactor;
  const y = scaleBand()
    .domain(yGrid)
    .range([0, innerHeight])
    .paddingInner(yPadding);

  const grid = xGrid.map((x) => yGrid.map((y) => ({ x, y }))).flat();

  const germanFormatter = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    signDisplay: "always",
  });
  const germanNumberPrefixed = (value: number) => germanFormatter.format(value);
  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  return (
    <ChartSvg id={chart.id} width={width} height={height}>
      <ChartBackground width={width} height={height} />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <ChartTile
          width={x.bandwidth()}
          height={y.bandwidth()}
          bigIndicator={germanNumber(caseData[caseData.length - 1].sumValue)}
          smallIndicator={germanNumberPrefixed(
            caseData[caseData.length - 1].sumNewCases
          )}
          indicatorDescription="bestä­tigte Fälle"
          indicatorColor={chartColors.blue}
          scalingFactor={scalingFactor}
          transform={`translate(${x(grid[0].x) || 0}, ${y(grid[0].y) || 0})`}
        />
        <ChartTile
          width={x.bandwidth()}
          height={y.bandwidth()}
          bigIndicator={`${germanNumberPrefixed(
            Math.round(weekTrend(caseData) || 0)
          )} %`}
          indicatorDescription={`${(weekTrend(caseData) || 0) < 0 ? 'weniger' : 'mehr' } Fälle im Vergleich zur Vorwoche`}
          indicatorColor={chartColors.tileFont}
          scalingFactor={scalingFactor}
          transform={`translate(${x(grid[1].x) || 0}, ${y(grid[1].y) || 0})`}
        />
        <ChartTile
          width={x.bandwidth()}
          height={y.bandwidth()}
          bigIndicator={germanNumber(
            recoveredData[recoveredData.length - 1].sumValue
          )}
          smallIndicator={germanNumberPrefixed(
            recoveredData[recoveredData.length - 1].sumNewCases
          )}
          indicatorDescription="geschätzte Genesungen"
          indicatorColor={chartColors.green}
          scalingFactor={scalingFactor}
          transform={`translate(${x(grid[2].x) || 0}, ${y(grid[2].y) || 0})`}
        />
        <ChartTile
          width={x.bandwidth()}
          height={y.bandwidth()}
          bigIndicator={germanNumber(deathData[deathData.length - 1].sumValue)}
          smallIndicator={germanNumberPrefixed(
            deathData[deathData.length - 1].sumNewCases
          )}
          indicatorDescription="gemeldete Todesfälle"
          indicatorColor={chartColors.yellow}
          scalingFactor={scalingFactor}
          transform={`translate(${x(grid[3].x) || 0}, ${y(grid[3].y) || 0})`}
        />
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
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
