import React, { useEffect, useState } from "react";
import { scaleSqrt } from "d3-scale";
import { geoPath, geoMercator } from "d3-geo";
import { feature } from "topojson-client";

import { ChartSvg } from "./partials/ChartSvg";
import { ChartGroup } from "./partials/ChartGroup";
import { ChartHeader } from "./partials/ChartHeader";
import { ChartLegend, ChartKey } from "./partials/ChartLegend";
import { ChartBackground } from "./partials/ChartBackground";
import { ChartFooter } from "./partials/ChartFooter";
import { ChartLogo, chartLogoSize } from "./partials/ChartLogo";

import { MapProps, ChartData } from "./ChartProps";
import { chartColors, getMapColor } from "../../config/colors";
import { germanDate } from "../../utils/date";
import { incidence } from "../../utils/incidence";

export const IncidenceMap: React.FC<MapProps> = ({
  chart,
  chartData,
  startDate,
  endDate,
  width = 800,
  height = 450,
  minValue = 0,
  maxValue = 300,
  minRadius = 5,
  maxRadius = 20,
  scalingFactor = 1,
  hasLogo = false,
  hasAnnotation = false,
}) => {
  interface AnyObject {
    [key: string]: any;
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [geoData, setGeoData] = useState({});
  const [metaData, setMetaData] = useState<AnyObject[]>([]);
  const [labelData, setLabelData] = useState<AnyObject[]>([]);

  useEffect(() => {
    (async () => {
      setGeoData((await loadGeoData(chart.subType)) || {});
      setMetaData(Array.from((await loadMetaData(chart.subType)) || []));
      setLabelData(Array.from((await loadLabelData(chart.subType)) || []));

      setIsLoaded(true);
    })();
  }, []);

  if (isLoaded) {
    const margin = {
      top: 130 * scalingFactor,
      right: 25,
      bottom: hasLogo
        ? (chartLogoSize + 15) * scalingFactor
        : 65 * scalingFactor,
      left: 25,
    };
    const padding = 25;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const mapOffset = hasAnnotation ? 60 : 0;
    const maxLength = width / height > 1.5 ? 20 : 12;
    const maxLabels = height > 350 ? labelData.length : 4;
    const labels = labelData.slice(0, maxLabels);

    const caseData: ChartData[] = chartData.find(
      (datum) => datum.key === "cases"
    )?.data!;
    const uniqueCounties = [...new Set(caseData.map((d) => d.Landkreis))];
    const mergedCounties = uniqueCounties.map((name) => {
      const caseDataDistrict = caseData.filter((c) => c.Landkreis === name);
      const metaInfoCounty = metaData.find((m) => m.rkiName === name);

      return Object.assign(metaInfoCounty, {
        incidence: incidence(caseDataDistrict, metaInfoCounty!.pop),
      });
    });

    const worstCounties = mergedCounties
      .sort((a, b) => b.incidence - a.incidence)
      .slice(0, height > 350 ? 5 : 3);

    const mapFactor = height > width ? 0.9 : 1.1;
    // @ts-ignore: No definition for geoData
    const mapFeatures = feature(geoData, geoData.objects.counties);
    const mapProjection = geoMercator().translate([0, 0]).scale(1);
    const mapPath = geoPath().projection(mapProjection);
    const mapBounds = mapPath.bounds(mapFeatures);
    const mapScale: number =
      mapFactor /
      Math.max(
        (mapBounds[1][0] - mapBounds[0][0]) / innerWidth,
        (mapBounds[1][1] - mapBounds[0][1]) / innerHeight
      );
    const mapTranslate: [number, number] = [
      (innerWidth - mapScale * (mapBounds[1][0] + mapBounds[0][0])) / 2,
      (innerHeight - mapScale * (mapBounds[1][1] + mapBounds[0][1])) / 2,
    ];
    mapProjection.translate(mapTranslate).scale(mapScale);

    const radiusFactor =
      mapScale / (chart.subType === "map-bavaria" ? 7000 : 5000);
    const radiusScale = scaleSqrt()
      .domain([minValue, maxValue])
      .range([minRadius * radiusFactor, maxRadius * radiusFactor]);

    return (
      <ChartSvg id={chart.id} width={width} height={height}>
        <ChartBackground width={width} height={height} />
        <ChartGroup
          transform={`translate(${margin.right + mapOffset}, ${margin.top})`}
        >
          <path
            d={mapPath(mapFeatures)!}
            stroke={chartColors.mapOutline}
            strokeWidth={1.25 / (1 / radiusFactor)}
            strokeOpacity="0.75"
            fill={chartColors.mapBackground}
          ></path>
        </ChartGroup>
        <ChartGroup
          transform={`translate(${margin.right + mapOffset}, ${margin.top})`}
        >
          {mergedCounties.map((d: any, index: number) => (
            <circle
              key={index}
              r={Math.round(radiusScale(d.incidence))}
              cx={Math.round(mapProjection([d.long, d.lat])![0])}
              cy={Math.round(mapProjection([d.long, d.lat])![1])}
              fill={getMapColor(d.incidence)}
              style={{ mixBlendMode: "hard-light" }}
            >
              <title>
                {d.name} (${d.type}): {Math.round(d.incidence)}
              </title>
            </circle>
          ))}
        </ChartGroup>
        <ChartGroup
          transform={`translate(${margin.right + mapOffset}, ${margin.top})`}
        >
          {labels.map((d: any, index: number) => (
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
              x={Math.round(mapProjection([d.long, d.lat])![0])}
              y={Math.round(mapProjection([d.long, d.lat])![1])}
              dy={13 * scalingFactor}
            >
              {d.name}
            </text>
          ))}
        </ChartGroup>
        { hasAnnotation &&
          <ChartGroup
            transform={`translate(${margin.right + mapOffset}, ${margin.top})`}
          >
            {worstCounties.map((d: any, index: number) => (
              <text
                key={index}
                x={Math.round(mapProjection([d.long, d.lat])![0])}
                y={Math.round(mapProjection([d.long, d.lat])![1])}
                dy={4 * scalingFactor}
                fontFamily="'Open Sans', OpenSans, sans-serif"
                fontSize={12 * scalingFactor}
                fontWeight="600"
                textAnchor="middle"
                fill={chartColors.fontPrimary}
              >
                {index + 1}
              </text>
            ))}
          </ChartGroup>
        }
        { hasAnnotation && 
          <ChartGroup
            transform={`translate(${padding}, ${
              height - (height > 350 ? 300 : 200) + (hasLogo ? 0 : chartLogoSize) * scalingFactor
            })`}
          >
            <text
              fontFamily="'Open Sans', OpenSans, sans-serif"
              fontSize={15 * scalingFactor}
              fontWeight="300"
              dy={-27 * scalingFactor}
              fill={chartColors.fontPrimary}
            >
              Höchste Inzidenz:
            </text>
            {worstCounties.map((d: any, index: number) => (
              <g
                key={index}
                transform={`translate(${Math.round(radiusScale(maxValue))}, ${
                  index * 42 * scalingFactor
                })`}
              >
                <circle
                  key={index}
                  y={Math.round(radiusScale(d.incidence) / 2)}
                  r={Math.round(radiusScale(d.incidence))}
                  fill={getMapColor(d.incidence)}
                  // style={{ mixBlendMode: "hard-light" }}
                />
                <text
                  dy={4 * scalingFactor}
                  fontFamily="'Open Sans', OpenSans, sans-serif"
                  fontSize={12 * scalingFactor}
                  fontWeight="600"
                  textAnchor="middle"
                  fill={chartColors.fontPrimary}
                >
                  {index + 1}
                </text>
                <text
                  fontFamily="'Open Sans', OpenSans, sans-serif"
                  fontSize={15 * scalingFactor}
                  fontWeight="300"
                  fill={chartColors.fontPrimary}
                >
                  <tspan
                    x={Math.round(radiusScale(maxValue)) + 10}
                    fontWeight="600"
                  >
                    {d.name.length > maxLength
                      ? d.name.substring(0, maxLength - 2) + "…"
                      : d.name}{" "}
                    ({d.type === "Landkreis" ? "Lkr." : d.type})
                  </tspan>
                  <tspan
                    x={Math.round(radiusScale(maxValue)) + 10}
                    dy={16 * scalingFactor}
                  >
                    {Math.round(d.incidence)}
                  </tspan>
                </text>
              </g>
            ))}
          </ChartGroup>
        }
        <ChartHeader
          title={chart.title}
          description={chart.description}
          scalingFactor={scalingFactor}
          transform={`translate(${margin.right}, ${padding})`}
        />
        <ChartLegend transform={`translate(${padding}, ${80 * scalingFactor})`}>
          {/* <ChartKey
            text="≥ 200 Fälle"
            symbol="circle"
            symbolSize={radiusScale(200)}
            symbolFill={getMapColor(200)}
            scalingFactor={scalingFactor}
          /> */}
          <ChartKey
            text="≥ 100 Fälle"
            symbol="circle"
            symbolSize={radiusScale(100)}
            symbolFill={getMapColor(100)}
            scalingFactor={scalingFactor}
          />
          <ChartKey
            text="≥ 50 Fälle"
            symbol="circle"
            symbolSize={radiusScale(50)}
            symbolFill={getMapColor(50)}
            scalingFactor={scalingFactor}
            transform={`translate(${120 * scalingFactor}, 0)`}
          />
          <ChartKey
            text="≥ 35 Fälle"
            symbol="circle"
            symbolSize={radiusScale(35)}
            symbolFill={getMapColor(35)}
            scalingFactor={scalingFactor}
            transform={`translate(${235 * scalingFactor}, 0)`}
          />
          <ChartKey
            text="≥ 1 Fall"
            symbol="circle"
            symbolSize={radiusScale(1)}
            symbolFill={getMapColor(1)}
            scalingFactor={scalingFactor}
            transform={`translate(${340 * scalingFactor}, 0)`}
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
  } else {
    return (
      <ChartSvg width={width} height={height}>
        <ChartBackground width={width} height={height} />
        <text
          fill="white"
          textAnchor="middle"
          transform={`translate(${width / 2}, ${height / 2})`}
        >
          Lade Karte ...
        </text>
      </ChartSvg>
    );
  }
};

async function loadGeoData(subType?: string) {
  if (subType === "map-bavaria") {
    return await import(
      /* webpackChunkName: 'bavaria-county-topo' */ "../../data/topo/bavaria-county-topo.json"
    );
  }

  if (subType === "map-germany") {
    return await import(
      /* webpackChunkName: 'germany-county-topo' */ "../../data/topo/germany-county-topo.json"
    );
  }
}

async function loadMetaData(subType?: string) {
  if (subType === "map-bavaria") {
    return await import(
      /* webpackChunkName: 'bavaria-county-meta' */ "../../data/meta/bavaria-county-meta.json"
    );
  }

  if (subType === "map-germany") {
    return await import(
      /* webpackChunkName: 'germany-county-meta' */ "../../data/meta/germany-county-meta.json"
    );
  }
}

async function loadLabelData(subType?: string) {
  if (subType === "map-bavaria") {
    return await import(
      /* webpackChunkName: 'bavaria-city-labels' */ "../../data/labels/bavaria-city-labels.json"
    );
  }

  if (subType === "map-germany") {
    return await import(
      /* webpackChunkName: 'germany-state-labels' */ "../../data/labels/germany-state-labels.json"
    );
  }
}
