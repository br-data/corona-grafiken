import { createGlobalStyle } from "styled-components";

import OpenSansLightWoff from './assets/fonts/open-sans-light.woff';
import OpenSansLightWoff2 from './assets/fonts/open-sans-light.woff2';
import OpenSansRegularWoff from './assets/fonts/open-sans-regular.woff';
import OpenSansRegularWoff2 from './assets/fonts/open-sans-regular.woff2';
import OpenSansItalicWoff from './assets/fonts/open-sans-italic.woff';
import OpenSansItalicWoff2 from './assets/fonts/open-sans-italic.woff2';
import OpenSansBoldWoff from './assets/fonts/open-sans-bold.woff';
import OpenSansBoldWoff2 from './assets/fonts/open-sans-bold.woff2';

import { appColors } from "./config/colors"

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 300;
    src: local(""),
      url(${OpenSansLightWoff2}) format("woff2"), 
      url(${OpenSansLightWoff}) format("woff"); 
  }
  
  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    src: local(""),
      url(${OpenSansRegularWoff2}) format("woff2"), 
      url(${OpenSansRegularWoff}) format("woff"); 
  }

  @font-face {
    font-family: "Open Sans";
    font-style: italic;
    font-weight: 400;
    src: local(""),
      url(${OpenSansItalicWoff2}) format("woff2"), 
      url(${OpenSansItalicWoff}) format("woff"); 
  }

  @font-face {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 700;
    src: local(""),
      url(${OpenSansBoldWoff2}) format("woff2"), 
      url(${OpenSansBoldWoff}) format("woff"); 
  }

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
    background: ${appColors.foreground};
  }

  main {
    min-height: 100%;
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
