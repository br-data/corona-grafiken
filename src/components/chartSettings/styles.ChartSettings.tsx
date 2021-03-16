import styled from "styled-components";

import { appColors } from "../../config/colors";

export const Form = styled.form<{
  isCollabsible?: boolean;
  hasCollapsed?: boolean;
}>`
  display: flex;
  overflow: ${({ isCollabsible, hasCollapsed }) =>
    isCollabsible && hasCollapsed ? "hidden" : "visible"};
  max-height: ${({ isCollabsible, hasCollapsed }) =>
    isCollabsible && hasCollapsed ? "0" : "100%"};
`;

export const FormCollapseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 1rem 0 auto;
  font-size: 2rem;
`;

export const Fieldset = styled.fieldset<{ isInline?: boolean }>`
  border: 0;
  padding: 0;
  margin: 0.5rem 1rem;
  white-space: ${({ isInline }) => (isInline ? "nowrap" : "normal")};
`;

export const Label = styled.label<{ isBold?: boolean; isBlock?: boolean }>`
  font-size: 1rem;
  font-weight: ${({ isBold }) => (isBold ? 600 : 400)};
  display: ${({ isBlock }) => (isBlock ? "block" : "inline")};
  vertical-align: middle;
`;

export const Select = styled.select`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  font-size: 1rem;
  max-width: 16rem;
  padding-left: 0.125rem;
  padding-right: 0.25rem;
  border: 2px solid ${appColors.inputOutline};
  border-radius: 5px;
`;

export const Input = styled.input`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  font-size: 1rem;
  padding-left: 0.35rem;
  padding-right: 0.25rem;
  border: 2px solid ${appColors.inputOutline};
  border-radius: 5px;

  &[type="number"] {
    padding-left: 0.35rem;
    padding-right: 0.25rem;
  }

  &[type="date"] {
    padding-left: 0.35rem;
    padding-right: 0.25rem;
  }
`;

export const Button = styled.button`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  margin: 0.5em;
  border: 0;
  color: ${appColors.buttonFont};
  background: ${appColors.buttonBackground};
  border-radius: 5px;

  &:hover {
    filter: brightness(1.25);
  }

  > svg {
    vertical-align: bottom;
  }
`;
