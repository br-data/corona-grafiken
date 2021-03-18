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
  disabled?: boolean;
  setDate: any;
}

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  setNumber: any;
}

interface CheckboxInputProps {
  id: string;
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
      tabIndex={0}
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
      <Label htmlFor={id} isBold={true} isBlock={true}>
        {label}:{" "}
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
  disabled = false,
  setDate,
}: DateInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <Fieldset>
      <Label htmlFor={id} isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Input
        id={id}
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
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
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  return (
    <Fieldset>
      <Label htmlFor={id} isBold={true} isBlock={true}>
        {label}:{" "}
      </Label>
      <Input
        id={id}
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
  id,
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
      <Label htmlFor={id} isBold={true} isBlock={true}>
        {label}:{" "}
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
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export const CheckboxInput = ({
  id,
  label,
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
        color="primary"
      />
      <Label htmlFor={id}>{label}</Label>
    </Fieldset>
  );
};
