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

  blue: "#0b9fd8",
  orange: "#e4743a",
  green: "#3ad29f",
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
  green: ciColors.green,
  red: ciColors.red,
  yellow: ciColors.yellow,
  pink: ciColors.pink,
};

export const getMapColor = (value: number) => {
  if (value >= 200) {
    // dark red
    return '#bb212f';
  } else if (value >= 100) {
    // dark orange
    return '#ed4834';
  } else if (value >= 50) {
    // orange
    return '#fb8e4e';
  } else if (value >= 35) {
    // light orange
    return '#fdc96c';
  } else {
    // light yellow
    return '#fffbb9';
  }
};
