import styled from "styled-components";

import { appColors } from "../../config/colors";

export const ChartWrapper = styled.figure`
  margin: 0.5rem;

  svg {
    display: block;
  }
`;

export const ChartDimensions = styled.figcaption`
  color: ${appColors.fontSecondary};
  margin: .25rem 0;
  text-align: right;
`;

export const ChartEditable = styled.figcaption`
  &:focus {
    outline: 3px solid ${appColors.highlight};
  }
`;
