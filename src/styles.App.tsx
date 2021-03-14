import styled from "styled-components";

import { appColors } from "./config/colors"

export const Header = styled.header`
  padding: 0 .5em .5em .5em;
  background: ${ appColors.foreground };
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  background: ${ appColors.foreground };
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
`;

export const ButtonWrapper = styled.div`

`;
