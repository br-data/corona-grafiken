import { createGlobalStyle } from "styled-components";
import { appColors } from "./config/colors"

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: "Open Sans", OpenSans, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: ${appColors.fontPrimary};
    background: ${appColors.background};
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
