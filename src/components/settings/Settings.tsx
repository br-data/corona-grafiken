import React from "react";
import { Form, Fieldset, Label, Select, Input } from "./styles.Settings";
import { ChartObject } from "../../config/charts";

interface DateInputProps {
  label: string;
  value: string;
  min: string;
  max: string;
  setDate: any;
}

interface NumberInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  setNumber: any;
}

export const Settings: React.FC = ({ children }) => {
  return <Form>{children}</Form>;
};

export const ChartSelect = ({ label, value, charts, setChart }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chart = charts.find(
      (chart: ChartObject) => chart.id === event.target.value
    );
    setChart(chart);
  };

  return (
    <Fieldset>
      <Label>{label}: </Label>
      <Select value={value.id} onChange={handleChange}>
        {charts.map((chart: ChartObject, index: number) => (
          <option value={chart.id} key={index}>
            {chart.title}
          </option>
        ))}
      </Select>
    </Fieldset>
  );
};

export const DateInput = ({
  label,
  value,
  min,
  max,
  setDate,
}: DateInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <Fieldset>
      <Label>{label}: </Label>
      <Input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      ></Input>
    </Fieldset>
  );
};

export const NumberInput = ({
  label,
  value,
  min,
  max,
  setNumber,
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  return (
    <Fieldset>
      <Label>{label}: </Label>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      ></Input>
    </Fieldset>
  );
};
