export const ciColors = {
  white: "#ffffff",
  black: "#323232",

  superLightGrey: "#ededf3",
  veryLightGrey: "#ced3d9",
  lightGrey: "#9da1a5",
  mediumGrey: "#8f9399",
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
  background: ciColors.superLightGrey,
  highlight: ciColors.blue,
  inputOutline: ciColors.veryLightGrey,
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
