import React from 'react';
import { chartTypes } from '../../config/config';

export const Settings: React.FC = ({ children }) => {
  return <form>{children}</form>
}

export const ChartTypeSelect = ({ setChartType, defaultChart } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  return (
    <fieldset>
      <label>Grafik auswählen: </label>
      <select value={defaultChart} onChange={handleChange}>
        {chartTypes.map((chart, index) => (
          <option value={chart.id} key={index}>{chart.title}</option>
        ))}
      </select>
    </fieldset>
  );
}

export const StartDateInput = ({ value, min, max, setStartDate } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  return (
    <fieldset>
      <label>Startdatum: </label>
      <input type='date' value={value} min={min} max={max} onChange={handleChange}></input>
    </fieldset>
  );
}

export const EndDateInput = ({ value, min, max, setEndDate } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <fieldset>
      <label>Enddatum: </label>
      <input type='date' value={value} min={min} max={max} onChange={handleChange}></input>
    </fieldset>
  )
}
