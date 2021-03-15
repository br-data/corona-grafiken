import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  html {
    font-family: "Open Sans", OpenSans, sans-serif;
    font-size: 16px;
    line-height: 1.6;
  }

  body {
    background: #f2f2f2;
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;