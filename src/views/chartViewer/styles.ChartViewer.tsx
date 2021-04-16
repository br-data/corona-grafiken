import styled from "styled-components";

import { appColors } from "../../config/colors";

export const ChartWrapper = styled.div`
  margin: 0.5rem;

  svg {
    display: block;
  }
`;

export const ChartHint = styled.div`
  color: ${appColors.fontPrimary};
  font-size: 0.85rem;
  margin: 0.25rem;
  text-align: left;
`;

export const ChartDimensions = styled.div`
  color: ${appColors.fontPrimary};
  font-size: 0.85rem;
  margin: 0.25rem;
  text-align: right;
`;

export const ChartEditable = styled.div`
  caret-color: ${appColors.foreground};;

  &:focus {
    outline: 3px solid ${appColors.highlight};
  }
`;
