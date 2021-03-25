import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { IoIosSettings } from "react-icons/io";

import {
  Form,
  Fieldset,
  Label,
  Select,
  Input,
  SymbolButton,
} from "./styles.ChartSettings";

import { ChartObject } from "../../config/charts";
import { FormatObject } from "../../config/formats";
import { appColors } from "../../config/colors";

interface SettingsProps {
  isCollapsible?: boolean;
  hasCollapsed?: boolean;
  setHasCollapsed?: any;
}

interface SelectProps {
  id: string;
  label: string;
  value: any;
  options: any;
  setOption: any;
}

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  min: string;
  max: string;
  setDate: any;
  disabled?: boolean;
  isFocusable?: boolean;
}

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  setNumber: any;
  isFocusable?: boolean;
}

interface CheckboxInputProps {
  id: string;
  label: string;
  isChecked: boolean;
  setIsChecked: any;
  disabled?: boolean;
  isFocusable?: boolean;
}

export const Settings: React.FC<SettingsProps> = ({
  isCollapsible,
  hasCollapsed,
  children,
}) => {
  return (
    <Form isCollapsible={isCollapsible} hasCollapsed={hasCollapsed}>
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
    <SymbolButton
      title="Weitere Einstellungen anzeigen"
      tabIndex={0}
      onClick={handleClick}
    >
      <IoIosSettings
        color={
          hasCollapsed ? appColors.inputOutline : appColors.buttonBackground
        }
        size="2.5rem"
      />
    </SymbolButton>
  );
};

export const ChartSelect = ({
  id,
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
      <Label htmlFor={id} isBold={false} isBlock={true}>
        {label}
      </Label>
      <Select id={id} value={value.id} onChange={handleChange}>
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
  id,
  label,
  value,
  min,
  max,
  setDate,
  disabled = false,
  isFocusable = true,
}: DateInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <Fieldset>
      <Label htmlFor={id} isBold={false} isBlock={true}>
        {label}
      </Label>
      <Input
        id={id}
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        tabIndex={isFocusable ? 0 : -1}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export const NumberInput = ({
  id,
  label,
  value,
  min,
  max,
  setNumber,
  isFocusable = true,
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  return (
    <Fieldset>
      <Label htmlFor={id} isBold={false} isBlock={true}>
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        tabIndex={isFocusable ? 0 : -1}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export const SliderInput = ({
  id,
  label,
  value,
  min,
  max,
  step,
  setNumber,
  isFocusable = true,
}: NumberInputProps) => {
  const handleChange = (event: any, newValue: number | number[]) => {
    setNumber(newValue);
  };

  return (
    <Fieldset style={{ maxHeight: "3.25rem" }}>
      <Label htmlFor={id} isBold={false} isBlock={true}>
        {label}
      </Label>
      <Slider
        id={id}
        value={value}
        defaultValue={value}
        valueLabelDisplay="auto"
        aria-label="label"
        step={step}
        min={min}
        max={max}
        disabled={!isFocusable}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export const CheckboxInput = ({
  id,
  label,
  disabled = false,
  isChecked,
  setIsChecked,
}: CheckboxInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Fieldset isInline={true}>
      <Switch
        id={id}
        checked={isChecked}
        onChange={handleChange}
        tabIndex={0}
        color="primary"
        disabled={disabled}
      />
      <Label htmlFor={id} isBold={false}>
        {label}
      </Label>
    </Fieldset>
  );
};
