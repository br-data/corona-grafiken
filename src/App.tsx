import React, { useState } from "react";
import { GlobalStyle } from "./styles/globalStyles";
import { ChartViewer } from "./components/chartViewer/ChartViewer";
import {
  Settings,
  ChartSelect,
  DateInput,
  NumberInput,
  CheckboxInput,
} from "./components/settings/Settings";
import { charts } from "./config/charts";

export default function App() {
  const toDateString = (date: Date) => date.toISOString().split("T")[0];

  const defaultChart = charts[3];
  const minStartDate = "2020-01-24";
  const defaultStartDate = "2020-02-25";
  const maxEndDate = toDateString(new Date());
  const defaultWidth = 800;
  const defaultHeight = 450;
  const defaultLogoVisibility = false;

  const [chart, setChart] = useState(defaultChart);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(maxEndDate);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [hasLogo, setHasLogo] = useState(defaultLogoVisibility);

  return (
    <>
      <GlobalStyle />
      <Settings>
        <ChartSelect
          label="Grafik auswählen"
          value={chart}
          charts={charts}
          setChart={setChart}
        />
        <DateInput
          label="Startdatum"
          value={startDate}
          min={minStartDate}
          max={maxEndDate}
          setDate={setStartDate}
        />
        <DateInput
          label="Enddatum"
          value={endDate}
          min={minStartDate}
          max={maxEndDate}
          setDate={setEndDate}
        />
        <NumberInput
          label="Breite"
          value={width}
          min={0}
          max={2560}
          setNumber={setWidth}
        />
        <NumberInput
          label="Höhe"
          value={height}
          min={0}
          max={1440}
          setNumber={setHeight}
        />
        <CheckboxInput
          label="BR24-Logo anzeigen"
          isChecked={hasLogo}
          setIsChecked={setHasLogo}
        />
      </Settings>
      <ChartViewer
        chart={chart}
        startDate={startDate}
        endDate={endDate}
        width={width}
        height={height}
        hasLogo={hasLogo}
      />
    </>
  );
}
