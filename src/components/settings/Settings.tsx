import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { AiOutlineSetting } from "react-icons/ai";

import {
  Form,
  Fieldset,
  Label,
  Select,
  Input,
  SymbolButton,
} from "./styles.Settings";

import { appColors } from "../../config/colors";

interface SettingsProps {
  isCollapsible?: boolean;
  hasCollapsed?: boolean;
  alignRight?: boolean;
  setHasCollapsed?: any;
}

interface InputProps {
  id: string;
  label: string;
  value?: any;
  isDisabled?: boolean;
  isFocusable?: boolean;
}

interface SelectOptionProps {
  id: string;
  name: string;
  [key: string]: any;
}

interface SelectInputProps extends InputProps {
  options: SelectOptionProps[];
  setOption: any;
}

interface DateInputProps extends InputProps {
  min?: string;
  max?: string;
  setDate: any;
}

interface NumberInputProps extends InputProps {
  min?: number;
  max?: number;
  step?: number;
  setNumber: any;
}

interface CheckboxInputProps extends InputProps {
  isChecked: boolean;
  setIsChecked: any;
}

export const Settings: React.FC<SettingsProps> = ({
  isCollapsible,
  hasCollapsed,
  alignRight,
  children,
}) => {
  return (
    <Form isCollapsible={isCollapsible} hasCollapsed={hasCollapsed} alignRight={alignRight}>
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
      <AiOutlineSetting
        color={
          hasCollapsed ? appColors.headerFontPrimary : appColors.buttonBackground
        }
        size="28px"
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
  isDisabled = false,
  isFocusable = true,
}: SelectInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = options.find(
      option => option.id === event.target.value
    );
    setOption(option);
  };

  return (
    <Fieldset>
      <Label htmlFor={id} isBold={false} isBlock={true}>
        {label}
      </Label>
      <Select
        id={id}
        value={value.id}
        onChange={handleChange}
        disabled={isDisabled}
        tabIndex={isFocusable ? 0 : -1}
      >
        {options.map((option: SelectOptionProps, index: number) => (
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
  isDisabled = false,
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
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        tabIndex={isFocusable ? 0 : -1}
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
  isDisabled = false,
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
        onChange={handleChange}
        min={min}
        max={max}
        disabled={isDisabled}
        tabIndex={isFocusable ? 0 : -1}
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
  isChecked,
  setIsChecked,
  isDisabled = false,
  isFocusable = true,
}: CheckboxInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Fieldset isInline={true}>
      <Label htmlFor={id} isBold={false} isDisabled={isDisabled}>
        {label}
      </Label>
      <Switch
        id={id}
        color="primary"
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        tabIndex={isFocusable ? 0 : -1}
      />
    </Fieldset>
  );
};
