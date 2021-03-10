import React from 'react';
import { Form, Fieldset, Label, Select, Input } from './styles.Settings'
import { ChartObject } from '../../config/charts';

export const Settings: React.FC = ({ children }) => {
  return <Form>{children}</Form>
}

export const ChartSelect = ({ value, charts, setChart } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chart = charts.find((chart: ChartObject) => chart.id === event.target.value);
    setChart(chart);
  };

  return (
    <Fieldset>
      <Label>Grafik auswählen: </Label>
      <Select value={value.id} onChange={handleChange}>
        {charts.map((chart: ChartObject, index: number) => (
          <option value={chart.id} key={index}>{chart.title}</option>
        ))}
      </Select>
    </Fieldset>
  );
}

export const StartDateInput = ({ value, min, max, setStartDate } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  return (
    <Fieldset>
      <Label>Startdatum: </Label>
      <Input type='date' value={value} min={min} max={max} onChange={handleChange}></Input>
    </Fieldset>
  );
}

export const EndDateInput = ({ value, min, max, setEndDate } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <Fieldset>
      <Label>Enddatum: </Label>
      <Input type='date' value={value} min={min} max={max} onChange={handleChange}></Input>
    </Fieldset>
  )
}
