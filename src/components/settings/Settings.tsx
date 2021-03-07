import React from 'react';
import { Form, Fieldset, Label, Select, Input } from './styles.Settings'
import { chartTypes } from '../../config/config';

export const Settings: React.FC = ({ children }) => {
  return <Form>{children}</Form>
}

export const ChartTypeSelect = ({ setChartType, defaultChart } : any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  return (
    <Fieldset>
      <Label>Grafik auswählen: </Label>
      <Select value={defaultChart} onChange={handleChange}>
        {chartTypes.map((chart, index) => (
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
