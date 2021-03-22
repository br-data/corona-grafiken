import { createGlobalStyle } from "styled-components";
import { appColors } from "./config/colors"

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

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
    background: "${appColors.foreground}";
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${appColors.background};
  }

  p {
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
