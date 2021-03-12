import React from "react";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";
import { ChartTile } from "../chartPartials/ChartTile";

import { ChartObject, ChartDataObject } from "../../config/charts";
import { chartColors } from "../../config/colors";
import { germanDate } from "../../utils/date";
import { weekTrend } from "../../utils/weekTrend";

interface TilesProps {
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

export const Tiles: React.FC<TilesProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width,
  height,
  hasLogo,
}) => {
  const caseData: DataObject[] = chartData.find((datum) => datum.key === "cases")
    ?.data;
  const recoveredData: DataObject[] = chartData.find((datum) => datum.key === "recoveries")
    ?.data;
  const deathData: DataObject[] = chartData.find((datum) => datum.key === "deaths")
    ?.data;

  const margin = {
    top: 100,
    right: 25,
    bottom: hasLogo ? chartLogoSize + 60 : 75,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const tileWidth = (innerWidth / 2) - 15
  const tileHeight = (innerHeight / 2) - 15

  const germanNumber = (value: number) => value.toLocaleString("de-DE");

  return (
    <ChartSvg id={chart.id} width={width} height={height}>
      <ChartBackground width={width} height={height} />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <ChartTile
          width={tileWidth}
          height={tileHeight}
          bigIndicator={germanNumber(caseData[caseData.length-1].sumValue)}
          smallIndicator={germanNumber(caseData[caseData.length-1].sumNewCases)}
          indicatorDescription="bestä­tigte Fälle"
          indicatorColor={chartColors.blue}
        />
        <ChartTile
          transform={`translate(${tileWidth + 30}, 0)`}
          width={tileWidth}
          height={tileHeight}
          bigIndicator={germanNumber(weekTrend(caseData) || 0)}
          indicatorDescription="neue Fälle im Vergleich zur Vorwoche"
          indicatorColor={chartColors.tileFont}
        />
        <ChartTile
          transform={`translate(0, ${tileHeight + 30})`}
          width={tileWidth}
          height={tileHeight}
          bigIndicator={germanNumber(recoveredData[recoveredData.length-1].sumValue)}
          smallIndicator={germanNumber(recoveredData[recoveredData.length-1].sumNewCases)}
          indicatorDescription="geschätzte Genesungen"
          indicatorColor={chartColors.green}
        />
        <ChartTile
          transform={`translate(${tileWidth + 30}, ${tileHeight + 30})`}
          width={tileWidth}
          height={tileHeight}
          bigIndicator={germanNumber(deathData[deathData.length-1].sumValue)}
          smallIndicator={germanNumber(deathData[deathData.length-1].sumNewCases)}
          indicatorDescription="gemeldete Todesfälle"
          indicatorColor={chartColors.yellow}
        />
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        transform={`translate(${margin.right}, 40)`}
      />
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
