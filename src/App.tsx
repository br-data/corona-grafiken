import React, { useState } from 'react';
import { GlobalStyle } from './styles/globalStyles';
import { Chart } from './components/chart/Chart';
import { Settings, ChartTypeSelect, StartDateInput, EndDateInput } from './components/settings/Settings'

export default function App() {
  const toDateString = (date: Date) => date.toISOString().split('T')[0];
  
  const defaultChart = 'bavaria-cases-chart';
  const minStartDate = '2020-01-24';
  const defaultStartDate = '2020-02-25';
  const maxEndDate = toDateString(new Date());

  const [chartType, setChartType] = useState('line-chart');
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(maxEndDate);

  return (
    <>
      <GlobalStyle />
      <Settings>
        <ChartTypeSelect
          setChartType={setChartType}
          defaultChart={defaultChart}
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
      <Chart
        chartType={chartType}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
