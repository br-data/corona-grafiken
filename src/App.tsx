import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { GlobalStyle, Content, Controls, Footer } from "./styles.App";
import { Header } from "./components/header/Header";
import { ChartViewer } from "./views/chartViewer/ChartViewer";
import {
  Settings,
  SettingsButton,
  ChartSelect,
  DateInput,
  NumberInput,
  SliderInput,
  CheckboxInput,
} from "./components/settings/Settings";
import { FlexibleFieldset } from "./components/settings/styles.Settings";
import { DownloadButton } from "./components/downloadButton/DownloadButton";
import { HelpButton } from "./views/helpDialog/HelpDialog";

import { appColors } from "./config/colors";
import { charts } from "./config/charts";
import { formats } from "./config/formats";

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', OpenSans, sans-serif",
  },
  palette: {
    primary: {
      main: appColors.highlight,
    },
  },
});

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultChart =
    charts.filter((c) => c.id === searchParams.get("chart"))[0] || charts[0];
  const defaultFormat =
    formats.filter((f) => f.id === searchParams.get("format"))[0] || formats[0];

  const defaultWidth = defaultFormat.width;
  const defaultHeight = defaultFormat.height;
  const defaultScalingFactor = defaultFormat.scalingFactor;
  const defaultDateDisabled = !defaultChart.dataHasDate;
  const defaultAnnotationDisabled = !defaultChart.hasAnnotation;
  const defaultAnnotationVisibility = true;
  const defaultLabelsDisabled = !defaultChart.hasLabels;
  const defaultLabelVisibility = true;
  const defaultLogoVisibility = true;

  const minStartDate = "2020-01-24";
  const defaultStartDate = "2020-02-25";
  const maxEndDate = new Date().toISOString().split("T")[0];

  const [chart, setChart] = useState(defaultChart);
  const [format, setFormat] = useState(defaultFormat);

  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [scalingFactor, setScalingFactor] = useState(defaultScalingFactor);
  const [dateDisabled, setDateDisabled] = useState(defaultDateDisabled);
  const [annotationDisabled, setAnnotationDisabled] = useState(
    defaultAnnotationDisabled
  );
  const [hasAnnotation, setHasAnnotation] = useState(
    defaultAnnotationVisibility
  );
  const [labelsDisabled, setLabelsDisabled] = useState(defaultLabelsDisabled);
  const [hasLabels, setHasLabels] = useState(defaultLabelVisibility);
  const [hasLogo, setHasLogo] = useState(defaultLogoVisibility);
  const [hasCollapsed, setHasCollapsed] = useState(true);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(maxEndDate);

  const [svgDom, setSvgDom] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    setWidth(format.width);
    setHeight(format.height);
    setScalingFactor(format.scalingFactor);
  }, [format]);

  useEffect(() => {
    setDateDisabled(!chart.dataHasDate);
    setAnnotationDisabled(!chart.hasAnnotation);
    setLabelsDisabled(!chart.hasLabels);
  }, [chart]);

  useEffect(() => {
    setSearchParams({ chart: chart.id, format: format.id });
  }, [format, chart]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header
        title="Corona-Grafiken"
        description="Editor"
        organization="AI + Automation Lab"
        organizationLink="https://www.br.de/extra/ai-automation-lab/index.html"
      >
        <SettingsButton
          hasCollapsed={hasCollapsed}
          setHasCollapsed={setHasCollapsed}
        />
        <HelpButton />
      </Header>
      <Controls>
        <Settings>
          <ChartSelect
            id="chart-select"
            label="Grafik auswählen"
            value={chart}
            options={charts}
            setOption={setChart}
          />
          <ChartSelect
            id="format-select"
            label="Format auswählen"
            value={format}
            options={formats}
            setOption={setFormat}
          />
        </Settings>
        <Settings
          isCollapsible={true}
          hasCollapsed={hasCollapsed}
          setHasCollapsed={setHasCollapsed}
          alignRight={true}
        >
          <DateInput
            id="start-date-input"
            label="Startdatum"
            value={startDate}
            min={minStartDate}
            max={maxEndDate}
            isDisabled={dateDisabled}
            setDate={setStartDate}
            isFocusable={!hasCollapsed}
          />
          <DateInput
            id="end-date-input"
            label="Enddatum"
            value={endDate}
            min={minStartDate}
            max={maxEndDate}
            isDisabled={dateDisabled}
            setDate={setEndDate}
            isFocusable={!hasCollapsed}
          />
          <NumberInput
            id="width-input"
            label="Breite"
            value={width}
            min={0}
            max={2560}
            setNumber={setWidth}
            isFocusable={!hasCollapsed}
          />
          <NumberInput
            id="height-input"
            label="Höhe"
            value={height}
            min={0}
            max={1440}
            setNumber={setHeight}
            isFocusable={!hasCollapsed}
          />
          <SliderInput
            id="scaling-factor-input"
            label="Skalierung"
            value={scalingFactor}
            min={0.75}
            max={1.25}
            step={0.05}
            setNumber={setScalingFactor}
            isFocusable={!hasCollapsed}
          />
        </Settings>
      </Controls>
      <Content>
        <ChartViewer
          chart={chart}
          startDate={startDate}
          endDate={endDate}
          width={width}
          height={height}
          scalingFactor={scalingFactor}
          hasAnnotation={hasAnnotation}
          hasLabels={hasLabels}
          hasLogo={hasLogo}
          setSvgDom={setSvgDom}
        />
      </Content>
      <Footer>
        <FlexibleFieldset isInline={true}>
          <CheckboxInput
            id="logo-checkbox"
            label="BR24-Logo anzeigen"
            isChecked={hasLogo}
            setIsChecked={setHasLogo}
          />
          <CheckboxInput
            id="annotation-checkbox"
            label="Auswertung anzeigen"
            isDisabled={annotationDisabled}
            isChecked={hasAnnotation}
            setIsChecked={setHasAnnotation}
          />
          <CheckboxInput
            id="labels-checkbox"
            label="Ortsmarken anzeigen"
            isDisabled={labelsDisabled}
            isChecked={hasLabels}
            setIsChecked={setHasLabels}
          />
        </FlexibleFieldset>
        <FlexibleFieldset isInline={true} alignRight={true}>
          <DownloadButton
            type="svg"
            text="SVG herunterladen"
            chart={chart}
            svgDom={svgDom}
          />
          <DownloadButton
            type="png"
            text="PNG herunterladen"
            chart={chart}
            svgDom={svgDom}
          />
        </FlexibleFieldset>
      </Footer>
    </ThemeProvider>
  );
}
