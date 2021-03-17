import React from "react";
import { scaleSqrt } from "d3-scale";
import { geoPath, geoMercator, geoCentroid } from "d3-geo";
import { geoArea, geoBounds, geoLength } from "d3-geo";
import { feature } from "topojson-client";

import { ChartSvg } from "../chartPartials/ChartSvg";
import { ChartGroup } from "../chartPartials/ChartGroup";
import { ChartHeader } from "../chartPartials/ChartHeader";
import { ChartLegend, ChartKey } from "../chartPartials/ChartLegend";
import { ChartBackground } from "../chartPartials/ChartBackground";
import { ChartFooter } from "../chartPartials/ChartFooter";
import { ChartLogo, chartLogoSize } from "../chartPartials/ChartLogo";

import { MapProps, ChartData } from "./ChartProps";
import { chartColors, getMapColor } from "../../config/colors";
import { germanDate } from "../../utils/date";
import { incidence } from "../../utils/incidence";

import geoData from "../../data/topo/bavaria-county-topo.json";
import metaData from "../../data/meta/bavaria-county-meta.json";
import labelData from "../../data/labels/bavaria-city-labels.json";

export const BavariaMap: React.FC<MapProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width = 800,
  height = 450,
  minValue = 0,
  maxValue = 300,
  minRadius = 3,
  maxRadius = 18,
  scalingFactor = 1,
  hasLogo = false,
}) => {
  const margin = {
    top: 180 * scalingFactor,
    right: 25,
    bottom: hasLogo ? (chartLogoSize + 65) * scalingFactor : 85,
    left: 25,
  };
  const padding = 25;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radiusFactor = height / 800;

  const caseData: ChartData[] = chartData.find((datum) => datum.key === "cases")
    ?.data!;
  const uniqueCounties = [...new Set(caseData.map((d) => d.Landkreis))];
  const mergedCounties = uniqueCounties.map((name) => {
    const caseDataDistrict = caseData.filter((c) => c.Landkreis === name);
    const metaInfoCounty = metaData.find((m) => m.rkiName === name);

    return Object.assign(metaInfoCounty, {
      incidence: incidence(caseDataDistrict, metaInfoCounty!.pop),
    });
  });
  const worstCounties = mergedCounties.sort(
    (a, b) => b.incidence - a.incidence
  );

  const radius = scaleSqrt()
    .domain([minValue, maxValue])
    .range([minRadius * radiusFactor, maxRadius * radiusFactor]);

  // @ts-ignore: Library types don't match
  const geoFeature = feature(geoData, geoData.objects.counties);
  const geoCenter = geoCentroid(geoFeature);
  const geoScale = height * 7 * scalingFactor;
  const projection = geoMercator()
    .translate([innerWidth / 2, innerHeight / 2])
    .scale(geoScale)
    .center(geoCenter);
  const path = geoPath().projection(projection);

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
      {height > 350 && width > 350 && (
        <ChartGroup transform={`translate(${margin.right}, ${margin.top})`}>
          {labelData.map((d: any, index: number) => (
            <text
              key={index}
              fontFamily="'Open Sans', OpenSans, Arial"
              fontSize={15 * scalingFactor}
              fontWeight="300"
              fill={chartColors.white}
              stroke={chartColors.mapBackground}
              strokeWidth="3"
              strokeLinejoin="round"
              paintOrder="stroke"
              textAnchor="middle"
              x={Math.round(projection([d.long, d.lat])![0])}
              y={Math.round(projection([d.long, d.lat])![1])}
              dy={13 * scalingFactor}
            >
              {d.name}
            </text>
          ))}
        </ChartGroup>
      )}
      <ChartHeader
        title={chart.title}
        description={chart.description}
        scalingFactor={scalingFactor}
        transform={`translate(${margin.right}, ${padding})`}
      />
      <ChartLegend transform={`translate(${padding}, ${80 * scalingFactor})`}>
        <ChartKey
          text="> 200 Fälle"
          symbol="circle"
          symbolSize={radius(200)}
          symbolFill={getMapColor(200)}
          scalingFactor={scalingFactor}
        />
        <ChartKey
          text="> 50 Fälle"
          symbol="circle"
          symbolSize={radius(50)}
          symbolFill={getMapColor(50)}
          scalingFactor={scalingFactor}
          transform={`translate(${130 * scalingFactor}, 0)`}
        />
        <ChartKey
          text="> 35 Fälle"
          symbol="circle"
          symbolSize={radius(35)}
          symbolFill={getMapColor(35)}
          scalingFactor={scalingFactor}
          transform={`translate(${240 * scalingFactor}, 0)`}
        />
        <ChartKey
          text="> 1 Fall"
          symbol="circle"
          symbolSize={radius(1)}
          symbolFill={getMapColor(1)}
          scalingFactor={scalingFactor}
          transform={`translate(${350 * scalingFactor}, 0)`}
        />
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
