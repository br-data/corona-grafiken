import React, { useState } from 'react';
import { GlobalStyle } from './styles/globalStyles';
import { ChartViewer } from './components/chartViewer/ChartViewer';
import { Settings, ChartSelect, StartDateInput, EndDateInput } from './components/settings/Settings'
import { charts } from './config/charts';

export default function App() {
  const toDateString = (date: Date) => date.toISOString().split('T')[0];
  
  const defaultChart = charts[1];
  const minStartDate = '2020-01-24';
  const defaultStartDate = '2020-02-25';
  const maxEndDate = toDateString(new Date());

  const [chart, setChart] = useState(defaultChart);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(maxEndDate);

  return (
    <>
      <GlobalStyle />
      <Settings>
        <ChartSelect
          value={chart}
          charts={charts}
          setChart={setChart}
        />
        <StartDateInput
          value={startDate}
          min={minStartDate}
          max={maxEndDate}
          setStartDate={setStartDate}
        />
        <EndDateInput
          value={endDate}
          min={minStartDate}
          max={maxEndDate}
          setEndDate={setEndDate}
        />
      </Settings>
      <ChartViewer
        chart={chart}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
