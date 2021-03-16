import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import {
  Form,
  FormCollapseButton,
  Fieldset,
  Label,
  Select,
  Input,
} from "./styles.ChartSettings";

import { ChartObject } from "../../config/charts";
import { FormatObject } from "../../config/formats";
import { appColors } from "../../config/colors";

interface SettingsProps {
  isCollabsible?: boolean;
  hasCollapsed?: boolean;
  setHasCollapsed?: any;
}

interface SelectProps {
  label: string;
  value: any;
  options: any;
  setOption: any;
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
  step: number;
  setNumber: any;
}

interface CheckboxInputProps {
  label: string;
  isChecked: boolean;
  setIsChecked: any;
}

export const Settings: React.FC<SettingsProps> = ({
  isCollabsible,
  hasCollapsed,
  children,
}) => {
  return (
    <Form isCollabsible={isCollabsible} hasCollapsed={hasCollapsed}>
      {children}
    </Form>
  );
};

export const SettingsButton: React.FC<SettingsProps> = ({
  hasCollapsed,
  setHasCollapsed,
}) => {
  const handleClick = () => {
    setHasCollapsed(!hasCollapsed);
  };
  return (
    <FormCollapseButton
      title="Weitere Einstellungen anzeigen"
      onClick={handleClick}
    >
      {hasCollapsed && (
        <FiChevronDown color={appColors.inputOutline} size="3rem" />
      )}
      {!hasCollapsed && (
        <FiChevronUp color={appColors.inputOutline} size="3rem" />
      )}
    </FormCollapseButton>
  );
};

export const ChartSelect = ({
  label,
  value,
  options,
  setOption,
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = options.find(
      (option: ChartObject | FormatObject) => option.id === event.target.value
    );
    setOption(option);
  };

  return (
    <Fieldset>
      <Label isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Select value={value.id} onChange={handleChange}>
        {options.map((option: ChartObject | FormatObject, index: number) => (
          <option value={option.id} key={index}>
            {option.name}
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
      <Label isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
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
      <Label isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export const SliderInput = ({
  label,
  value,
  min,
  max,
  step,
  setNumber,
}: NumberInputProps) => {
  const handleChange = (event: any, newValue: number | number[]) => {
    setNumber(newValue);
  };

  return (
    <Fieldset>
      <Label isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Slider
        defaultValue={value}
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
      />
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
      <Switch checked={isChecked} onChange={handleChange} color="primary" />
      <Label>{label}</Label>
    </Fieldset>
  );
};
