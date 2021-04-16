import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

import { appColors } from "../../config/colors";

const InputFontSettings = css`
  box-sizing: content-box;
  font-family: "Open Sans", OpenSans, sans-serif;
  font-size: 1rem;
  color: ${appColors.fontPrimary};
  min-height: 1.5rem;
  cursor: pointer;
`;

const InputBoxSetting = css`
  text-indent: 0.25rem;
  padding: 0;
  border: 0;
  border-radius: 3px;
  border-bottom: 2px solid ${appColors.inputOutline};
  background: ${appColors.background};

  &:focus {
    outline: 0;
    border-bottom: 2px solid ${appColors.highlight};
  }
`;

export const Form = styled.form<{
  isCollapsible?: boolean;
  hasCollapsed?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  overflow: ${({ isCollapsible, hasCollapsed }) =>
    isCollapsible && hasCollapsed ? "hidden" : "visible"};
  max-height: ${({ isCollapsible, hasCollapsed }) =>
    isCollapsible && hasCollapsed ? "0" : "100%"};
`;

export const Fieldset = styled.fieldset<{ isInline?: boolean }>`
  margin: .25rem 1rem .25rem 0;
  padding: 0;
  border: 0;
  white-space: ${({ isInline }) => (isInline ? "nowrap" : "normal")};
`;

export const FlexibleFieldset = styled(Fieldset)<{ alignRight?: boolean }>`
  display: flex;
  margin-left: ${({ alignRight }) => (alignRight ? "auto" : "1rem")};
  margin-right: ${({ alignRight }) => (alignRight ? "0" : "0.5rem")};
`;

export const Label = styled.label<{ isBold?: boolean; isBlock?: boolean }>`
  color: ${appColors.fontSecondary};
  font-size: 0.85rem;
  margin: 0.1rem;
  font-weight: ${({ isBold }) => (isBold ? 600 : 400)};
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

  margin: 0 .5rem;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 4px;
  border-bottom: 2px solid ${darken(0.15, appColors.buttonBackground)};
  background: ${appColors.buttonBackground};
  color: ${appColors.buttonFont};
  transition: all 0.3s ease;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: 0;
    background: ${lighten(0.15, appColors.buttonBackground)};
  }

  > svg {
    vertical-align: bottom;
  }
`;

export const SymbolButton = styled.div`
  display: flex;
  align-self: center;
  margin-left: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: 0;

    > svg {
      color: #0b9fd8 !important;
    }
  }
`;