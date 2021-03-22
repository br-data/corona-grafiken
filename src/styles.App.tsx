import styled from "styled-components";

import { appColors } from "./config/colors";

export const Header = styled.header`
  flex: 0 0 auto;
  padding: 0.25rem 0.75rem 0.75rem 1rem;
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
  background: ${appColors.foreground};
`;

export const Content = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

export const Footer = styled.footer`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
  background: ${appColors.foreground};
`;
