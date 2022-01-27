export const ciColors = {
  white: "#ffffff",
  black: "#222222",
  almostBlack: "#333333",

  veryLightGrey: "#f7f7f7",
  lightGrey: "#c4cad0",
  mediumGrey: "#8c8c91",
  darkGrey: "#6a727c",
  veryDarkGrey: "#464b5a",

  lightBlueGrey: "#4b4f60",
  mediumBlueGrey: "#363b49",
  darkBlueGrey: "#1d2128",

  lightGreen: "#7dffd3",
  green: "#3ad29f",
  darkGreen: "#158f66",

  blue: "#0b9fd8",
  orange: "#e4743a",
  red: "#e64242",
  yellow: "#fbb800",
  pink: "#e20d67",
};

export const appColors = {
  fontPrimary: ciColors.black,
  fontSecondary: ciColors.mediumGrey,
  foreground: ciColors.white,
  background: ciColors.veryLightGrey,
  headerFontPrimary: ciColors.white,
  headerFontSecondary: ciColors.mediumGrey,
  headerBackground: ciColors.almostBlack,
  headerTabBackground: ciColors.black,
  headerTabSeparator: ciColors.veryDarkGrey,
  highlight: ciColors.blue,
  inputOutline: ciColors.lightGrey,
  inputBackground: ciColors.white,
  buttonFont: ciColors.white,
  buttonBackground: ciColors.blue,
};

export const chartColors = {
  fontPrimary: ciColors.white,
  fontSecondary: ciColors.mediumGrey,
  backgroundPrimary: ciColors.lightBlueGrey,
  backgroundSecondary: ciColors.darkBlueGrey,
  linePrimary: ciColors.white,
  lineSecondary: ciColors.darkGrey,
  mapBackground: ciColors.mediumGrey,
  mapOutline: ciColors.mediumBlueGrey,
  tileBackground: ciColors.mediumBlueGrey,
  tileFont: ciColors.white,
  white: ciColors.white,
  blue: ciColors.blue,
  orange: ciColors.orange,
  red: ciColors.red,
  yellow: ciColors.yellow,
  pink: ciColors.pink,
  lightGreen: ciColors.lightGreen,
  green: ciColors.green,
  darkGreen: ciColors.darkGreen,
};

export const getMapColor = (value: number) => {
  if (value >= 1000) {
    // dark red
    return '#800026';
  } else if (value >= 500) {
    // medium red
    return '#bd0026';
  } else if (value >= 200) {
    // dark orange
    return '#f03b20';
  } else if (value >= 100) {
    // medium orange
    return '#fd7c3c';
  } else if (value >= 50) {
    // light orange
    return '#feb24c';
  } else if (value >= 35) {
    // medium yellow
    return '#fed976';
  } else {
    // light yellow
    return '#ffffb2';
  }
};
