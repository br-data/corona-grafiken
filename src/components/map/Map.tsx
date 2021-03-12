import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleSqrt } from "d3-scale";
import { feature } from "topojson-client";

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
import { chartColors, getMapColor } from "../../config/colors";
import { germanDate, germanDateShort, dateRange } from "../../utils/date";
import { incidence } from "../../utils/incidence";

import geoData from "../../data/topo/bavaria-county-topo.json";
import metaData from "../../data/meta/bavaria-county-meta.json";
import labelData from "../../data/labels/bavaria-city-labels.json";

interface MapProps {
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

export const Map: React.FC<MapProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width,
  height,
  hasLogo,
}) => {
  const margin = {
    top: 140,
    right: 25,
    bottom: hasLogo ? chartLogoSize + 60 : 75,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const scalingFactor = height / 800;
  const minValue = 0;
  const maxValue = 300;
  const minRadius = 3;
  const maxRadius = 18;

  const caseData: DataObject[] = chartData.find(
    (datum) => datum.key === "cases"
  )?.data;
  const uniqueCounties = [...new Set(caseData.map((d) => d.Landkreis))];

  // Calculate 7-day-incidence per 100.000 population for each county
  const mergedCounties = uniqueCounties.map((name) => {
    const caseDataDistrict = caseData.filter((c) => c.Landkreis === name);
    const metaInfoCounty = metaData.find((m) => m.rkiName === name);
    return Object.assign(metaInfoCounty, {
      incidence: incidence(caseDataDistrict, metaInfoCounty!.pop),
    });
  });

  // Create labels for all counties
  const worstCounties = mergedCounties.sort(
    (a, b) => b.incidence - a.incidence
  );

  // Set scale for circle radiuses or radii, if you are a Latin nerd
  const radius = scaleSqrt()
    .domain([minValue, maxValue])
    .range([minRadius * scalingFactor, maxRadius * scalingFactor]);

  // Set map center and dimensions
  const projection = geoMercator()
    .translate([innerWidth / 2, innerHeight / 2])
    .scale(height * 7)
    .center([11.4, 49.0]);

  const path = geoPath().projection(projection);

  // @ts-ignore: Library types don't match
  const geoFeature = feature(geoData, geoData.objects.counties);

  return (
    <ChartSvg id={chart.id} width={width} height={height}>
      <ChartBackground width={width} height={height} />
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        <path
          // @ts-ignore: Library types don't match
          d={path(geoFeature)}
          stroke={chartColors.mapOutline}
          strokeWidth="1.25"
          strokeOpacity="0.75"
          fill={chartColors.mapBackground}
        ></path>
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        {mergedCounties.map((d: any, index: number) => (
          <circle
            key={index}
            r={Math.round(radius(d.incidence))}
            cx={Math.round(projection([d.long, d.lat])![0])}
            cy={Math.round(projection([d.long, d.lat])![1])}
            fill={getMapColor(d.incidence)}
            style={{ mixBlendMode: "hard-light" }}
          >
            <title>{`${d.name} (${d.type}): ${Math.round(d.incidence)}`}</title>
          </circle>
        ))}
      </ChartGroup>
      <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
        {labelData.map((d: any, index: number) => (
          <text
            key={index}
            fontFamily="'Open Sans', OpenSans, Arial"
            fontSize="15"
            fontWeight="300"
            fill={chartColors.white}
            stroke={chartColors.mapBackground}
            strokeWidth="3"
            strokeLinejoin="round"
            paintOrder="stroke"
            textAnchor="middle"
            x={Math.round(projection([d.long, d.lat])![0])}
            y={Math.round(projection([d.long, d.lat])![1])}
            dy="13"
          >
            {d.name}
          </text>
        ))}
      </ChartGroup>
      <ChartHeader
        title={chart.title}
        description={chart.description}
        transform={`translate(${margin.right}, 40)`}
      />
      <ChartLegend transform={`translate(25, 90)`}>
        <ChartKey
          text="> 200 Fälle"
          symbol="circle"
          symbolSize={radius(200)}
          symbolFill={getMapColor(200)}
        />
        <ChartKey
          transform={`translate(130, 0)`}
          text="> 50 Fälle"
          symbol="circle"
          symbolSize={radius(50)}
          symbolFill={getMapColor(50)}
        />
        <ChartKey
          transform={`translate(240, 0)`}
          text="> 35 Fälle"
          symbol="circle"
          symbolSize={radius(35)}
          symbolFill={getMapColor(35)}
        />
        <ChartKey
          transform={`translate(350, 0)`}
          text="> 1 Fall"
          symbol="circle"
          symbolSize={radius(1)}
          symbolFill={getMapColor(1)}
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
