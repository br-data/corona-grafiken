import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

import { appColors } from "../../config/colors";

const InputFontSettings = css`
  box-sizing: border-box;
  font-family: "Open Sans", OpenSans, sans-serif;
  color: ${appColors.fontPrimary};
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1;
`;

const InputBoxSetting = css`
  margin-top: 0.15rem;
  padding: 0.1rem;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid ${appColors.inputOutline};
  background: ${appColors.background};

  &:focus {
    outline-color: ${appColors.highlight};
  }
`;

export const Form = styled.form<{
  isCollabsible?: boolean;
  hasCollapsed?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  overflow: ${({ isCollabsible, hasCollapsed }) =>
    isCollabsible && hasCollapsed ? "hidden" : "visible"};
  max-height: ${({ isCollabsible, hasCollapsed }) =>
    isCollabsible && hasCollapsed ? "0" : "100%"};
`;

export const FormCollapseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 1rem 0 auto;
  font-size: 2rem;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:focus {
    outline: 0;
    background: ${appColors.background};
  }
`;

export const Fieldset = styled.fieldset<{ isInline?: boolean }>`
  margin: 0.5rem 1rem;
  padding: 0;
  border: 0;
  white-space: ${({ isInline }) => (isInline ? "nowrap" : "normal")};
`;

export const Label = styled.label<{ isBold?: boolean; isBlock?: boolean }>`
  font-size: 1rem;
  font-weight: ${({ isBold }) => (isBold ? 600 : 400)};
  display: ${({ isBlock }) => (isBlock ? "block" : "inline")};
  vertical-align: middle;
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

  margin: 0.5em;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid ${darken(0.15, appColors.buttonBackground)};
  background: ${appColors.buttonBackground};
  color: ${appColors.buttonFont};
  transition: background 0.3s ease;

  &:focus {
    outline: 0;
    background: ${lighten(0.15, appColors.buttonBackground)};
  }

  > svg {
    vertical-align: bottom;
  }
`;
