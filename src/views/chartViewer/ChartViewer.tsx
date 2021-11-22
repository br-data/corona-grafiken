import React, { useEffect, useState } from "react";

import { InfectionChart } from "../../components/charts/InfectionChart";
import { IntensiveCareChart } from "../../components/charts/IntensiveCareChart";
import { OverviewChart } from "../../components/charts/OverviewChart";
import { OverviewTiles } from "../../components/charts/OverviewTiles";
import { VaccinationChart } from "../../components/charts/VaccinationChart";
import { IncidenceMap } from "../../components/charts/IncidenceMap";
import {
  ChartWrapper,
  ChartEditable,
  ChartHint,
  ChartDimensions,
} from "./styles.ChartViewer";

import { ChartObject } from "../../config/charts";
import { useMultiFetch, MultiFetchProps } from "../../utils/useMultiFetch";

interface ChartViewerProps {
  chart: ChartObject;
  startDate: string;
  endDate: string;
  width: number;
  height: number;
  scalingFactor: number;
  hasAnnotation: boolean;
  hasLogo: boolean;
  setSvgDom: any;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({
  chart,
  startDate,
  endDate,
  width,
  height,
  scalingFactor,
  hasAnnotation,
  hasLogo,
  setSvgDom,
}) => {
  const [chartState, setChartState] = useState(chart.id);
  useEffect(() => {
    setChartState(chart.id);
  }, [chart]);

  const { error, isLoaded, chartData }: MultiFetchProps = useMultiFetch(
    chart,
    startDate,
    endDate
  );

  const chartProps = {
    chart,
    chartData,
    startDate,
    endDate,
    width,
    height,
    scalingFactor,
    hasAnnotation,
    hasLogo,
  };

  if (error) {
    return (
      <ChartWrapper>
        <div>Fehler: Daten konnte nicht geladen werden</div>
      </ChartWrapper>
    );
  } else if (!isLoaded || chartState !== chart.id) {
    return (
      <ChartWrapper>
        <div>Lade Daten ...</div>
      </ChartWrapper>
    );
  } else {
    return (
      <>
        <ChartWrapper>
          <ChartHint>
            Texte und Labels anklicken, um diese zu bearbeiten
          </ChartHint>
          <ChartEditable
            ref={setSvgDom}
            contentEditable={true}
            suppressContentEditableWarning={true}
            spellCheck={false}
          >
            {chart.type === "incidence-map" && <IncidenceMap {...chartProps} />}
            {chart.type === "infection-chart" && <InfectionChart {...chartProps} />}
            {chart.type === "intensive-care-chart" && <IntensiveCareChart {...chartProps} />}
            {chart.type === "overview-chart" && <OverviewChart {...chartProps} />}
            {chart.type === "overview-tiles" && <OverviewTiles {...chartProps} />}
            {chart.type === "vaccination-chart" && <VaccinationChart {...chartProps} />}
          </ChartEditable>
          <ChartDimensions>
            Größe: {width} × {height} (Auflösung: {width * 2} × {height * 2})
          </ChartDimensions>
        </ChartWrapper>
      </>
    );
  }
};
