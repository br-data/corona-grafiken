import styled from "styled-components";

export const Form = styled.form`
  display: flex;
`;

export const Fieldset = styled.fieldset<{ isInline?: boolean }>`
  border: 0;
  padding: 0;
  margin: .5em;
  white-space: ${({ isInline }) => (isInline ? "nowrap" : "normal")};
`;

export const Label = styled.label`
  font-size: 1rem;
`;

export const Select = styled.select`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  font-size: 1rem;
  height: 1.75rem;
  padding: 0 0.25rem;
  border: 1px solid black;
  border-radius: 5px;
`;

export const Input = styled.input`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  font-size: 1rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  border: 1px solid black;
  border-radius: 5px;
`;

export const Checkbox = styled.input`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
`;
