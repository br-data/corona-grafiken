import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
  }

  body {
    background: #fafafa;
  }
`;
