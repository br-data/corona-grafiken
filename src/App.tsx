import React, { useState } from 'react';
import { Chart } from './components/chart/Chart';

import { chartTypes } from './config/config';

const ChartTypeSelect = ({setChartType} : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {chartTypes.map((chartType, index) => (
        <option value={chartType.id} key={index}>{chartType.title}</option>
      ))}
    </select>
  );
}

const EndDateInput = ({setEndDate} : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return <input type='date' onChange={handleChange}></input>;
}

const StartDateInput = ({setStartDate} : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  return <input type='date' onChange={handleChange}></input>;
}

export default function App() {
  const [chartType, setChartType] = useState('line-chart');
  const [endDate, setEndDate] = useState('2021-03-09');
  const [startDate, setStartDate] = useState('2020-02-01');

  return (
    <>
      <ChartTypeSelect setChartType={setChartType} />
      <StartDateInput setStartDate={setStartDate} />
      <EndDateInput setEndDate={setEndDate} />
      <Chart
        chartType={chartType}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
