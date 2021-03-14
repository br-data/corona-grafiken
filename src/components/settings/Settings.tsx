import React from "react";
import { Switch } from '@material-ui/core';

import {
  Form,
  Fieldset,
  Label,
  Select,
  Input,
} from "./styles.Settings";
import { ChartObject } from "../../config/charts";

interface SelectProps {
  label: string;
  value: ChartObject;
  charts: ChartObject[];
  setChart: any;
}

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

interface CheckboxInputProps {
  label: string;
  isChecked: boolean;
  setIsChecked: any;
}

export const Settings: React.FC = ({ children }) => {
  return <Form>{children}</Form>;
};

export const ChartSelect = ({
  label,
  value,
  charts,
  setChart,
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chart = charts.find((chart) => chart.id === event.target.value);
    setChart(chart);
  };

  return (
    <Fieldset>
      <Label isBold={true} isBlock={true}>{label}: </Label>
      <Select value={value.id} onChange={handleChange}>
        {charts.map((chart, index) => (
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
      <Label isBold={true} isBlock={true}>{label}: </Label>
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
      <Label isBold={true} isBlock={true}>{label}: </Label>
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

export const CheckboxInput = ({
  label,
  isChecked,
  setIsChecked,
}: CheckboxInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Fieldset isInline={true}>
      <Switch checked={isChecked} onChange={handleChange} color="primary"/>
      <Label>{label}</Label>
    </Fieldset>
  );
};
