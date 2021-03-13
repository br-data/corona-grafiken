import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

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
