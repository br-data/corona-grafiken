import styled, { css } from "styled-components";
import { lighten } from "polished";

import { appColors } from "../../config/colors";

const InputFontSettings = css`
  box-sizing: content-box;
  font-family: "Open Sans", OpenSans, sans-serif;
  font-size: 0.85rem;
  color: ${appColors.fontSecondary};
  min-height: 1.85rem;
  cursor: pointer;
`;

const InputBoxSetting = css`
  text-indent: 0.25rem;
  padding: 0;
  border: 0;
  border-radius: 3px;
  border: 1px solid ${appColors.inputOutline};
  background: ${appColors.inputBackground};

  &:focus {
    outline: 0;
    color: ${appColors.fontPrimary};
    border: 1px solid ${appColors.highlight};
  }
`;

export const Form = styled.form<{
  alignRight?: boolean;
  isCollapsible?: boolean;
  hasCollapsed?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  overflow: ${({ isCollapsible, hasCollapsed }) =>
    isCollapsible && hasCollapsed ? "hidden" : "visible"};
  max-height: ${({ isCollapsible, hasCollapsed }) =>
    isCollapsible && hasCollapsed ? "0" : "100%"};
  margin-left: ${({ alignRight }) => (alignRight ? "auto" : "0")};
  margin-right: ${({ alignRight }) => (alignRight ? "0" : "1rem")};

  @media (max-width: 1050px) {
    margin-left: 0;
  }
`;

export const Fieldset = styled.fieldset<{ isInline?: boolean }>`
  margin: 0.25rem 1rem 0.25rem 0;
  padding: 0;
  border: 0;
  white-space: ${({ isInline }) => (isInline ? "nowrap" : "normal")};

  &:last-child {
    margin-right: 0;
  }
`;

export const FlexibleFieldset = styled(Fieldset)<{ alignRight?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0;
  margin-left: ${({ alignRight }) => (alignRight ? "auto" : "0")};

  @media (max-width: 1050px) {
    flex-wrap: wrap;
    margin-left: 0;

    > fieldset {
      margin: 0.5rem 0.5rem 0;
    }

    > button {
      margin-top: 0.5rem;
    }
  }

  @media (max-width: 500px) {
    justify-content: space-around;
  }
`;

export const Label = styled.label<{ isBold?: boolean; isDisabled?: boolean; isBlock?: boolean }>`
  color: ${({ isDisabled }) => (isDisabled ? appColors.fontSecondary : appColors.fontPrimary)};
  font-size: 0.85rem;
  margin: 0.1rem;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  display: ${({ isBlock }) => (isBlock ? "block" : "inline")};
`;

export const Select = styled.select`
  ${InputFontSettings}
  ${InputBoxSetting}
  
  max-width: 16rem;
  text-indent: 0.15rem;
`;

export const Input = styled.input`
  ${InputFontSettings}
  ${InputBoxSetting}

  &[type="number"] {
    min-width: 5rem;
    text-indent: 0.35rem;
  }

  &[type="date"] {
    text-indent: 0.15rem;
  }

  &:disabled {
    color: ${appColors.fontSecondary};
  }
`;

export const Button = styled.button`
  ${InputFontSettings}

  font-size: 1rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 4px;
  background: ${appColors.buttonBackground};
  color: ${appColors.buttonFont};
  transition: all 0.3s ease;

  &:focus {
    outline: 0;
    background: ${lighten(0.15, appColors.buttonBackground)};
  }

  > svg {
    margin-right: 0.25rem;
    vertical-align: text-top;
  }
`;

export const SymbolButton = styled.div`
  display: flex;
  align-self: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: 0;

    > svg {
      color: #0b9fd8 !important;
    }
  }
`;
