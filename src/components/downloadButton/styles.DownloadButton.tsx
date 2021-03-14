import styled from "styled-components";

import { appColors } from "../../config/colors";

export const Button = styled.button`
  font-family: "Open Sans", OpenSans, sans-serif;
  box-sizing: border-box;
  font-size: 1rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  margin-right: .5em;
  border: 0;
  color: ${appColors.buttonFont};
  background: ${appColors.buttonBackground};
  border-radius: 5px;
`;
