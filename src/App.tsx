import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { GlobalStyle } from "./styles.index";
import { Header, Footer, Content } from "./styles.App";
import { ChartViewer } from "./components/chartViewer/ChartViewer";
import {
  Settings,
  SettingsButton,
  ChartSelect,
  DateInput,
  NumberInput,
  SliderInput,
  CheckboxInput,
} from "./components/chartSettings/ChartSettings";
import { DownloadButton } from "./components/chartDownload/ChartDowload";

import { appColors } from "./config/colors";
import { charts } from "./config/charts";
import { formats } from "./config/formats";

const theme = createMuiTheme({
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
  const toDateString = (date: Date) => date.toISOString().split("T")[0];

  const defaultChart = charts[0];
  const defaultFormat = formats[0];

  const defaultWidth = defaultFormat.width;
  const defaultHeight = defaultFormat.height;
  const defaultScalingFactor = defaultFormat.scalingFactor;
  const defaultDateDisabled = !defaultChart.dataHasDate;
  const defaultLogoVisibility = true;

  const minStartDate = "2020-01-24";
  const defaultStartDate = "2020-02-25";
  const maxEndDate = toDateString(new Date());

  const [chart, setChart] = useState(defaultChart);
  const [format, setFormat] = useState(defaultFormat);

  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [scalingFactor, setScalingFactor] = useState(defaultScalingFactor);
  const [dateDisabled, setDateDisabled] = useState(defaultDateDisabled);
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
  }, [chart]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header>
        <Settings>
          <ChartSelect
            label="Grafik auswählen"
            value={chart}
            options={charts}
            setOption={setChart}
          />
          <ChartSelect
            label="Format auswählen"
            value={format}
            options={formats}
            setOption={setFormat}
          />
          <SettingsButton
            hasCollapsed={hasCollapsed}
            setHasCollapsed={setHasCollapsed}
          />
        </Settings>
        <Settings
          isCollabsible={true}
          hasCollapsed={hasCollapsed}
          setHasCollapsed={setHasCollapsed}
        >
          <DateInput
            label="Startdatum"
            value={startDate}
            min={minStartDate}
            max={maxEndDate}
            disabled={dateDisabled}
            setDate={setStartDate}
          />
          <DateInput
            label="Enddatum"
            value={endDate}
            min={minStartDate}
            max={maxEndDate}
            disabled={dateDisabled}
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
          <SliderInput
            label="Skalierung"
            value={scalingFactor}
            min={0.75}
            max={1.25}
            step={0.05}
            setNumber={setScalingFactor}
          />
        </Settings>
      </Header>
      <Content>
        <ChartViewer
          chart={chart}
          startDate={startDate}
          endDate={endDate}
          width={width}
          height={height}
          scalingFactor={scalingFactor}
          hasLogo={hasLogo}
          setSvgDom={setSvgDom}
        />
      </Content>
      <Footer>
        <CheckboxInput
          label="BR24-Logo anzeigen"
          isChecked={hasLogo}
          setIsChecked={setHasLogo}
        />
        <div>
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
        </div>
      </Footer>
    </ThemeProvider>
  );
}
