export const ciColors = {
  white: '#ffffff',
  black: '#323232',

  veryLightGrey: '#ced3d9',
  lightGrey: '#9da1a5',
  mediumGrey: '#8f9399',
  darkGrey: '#6a727c',
  veryDarkGrey: '#464b5a',

  lightBlueGrey: '#4b4f60',
  mediumBlueGrey: '#363b49',
  darkBlueGrey: '#1d2128',

  blue: '#0b9fd8',
  orange: '#e4743a',
  green: '#3ad29f',
  red: '#e64242',
  yellow: '#fbb800'
}

export const appColors = {
  font: ciColors.black,
  foreground: ciColors.white,
  background: ciColors.veryLightGrey
}

export const chartColors = {
  fontPrimary: ciColors.white,
  fontSecondary: ciColors.mediumGrey,
  backgroundPrimary: ciColors.lightBlueGrey,
  backgroundSecondary: ciColors.darkBlueGrey,
  linePrimary: ciColors.white,
  lineSecondary: ciColors.darkGrey,
  white: ciColors.white,
  blue: ciColors.blue,
  orange: ciColors.orange,
  green: ciColors.green,
  red: ciColors.red,
  yellow: ciColors.yellow
}

export const getMapColor = (value: number) => {
  if (value >= 200) {
    // dark red
    return '#bd0026';
  } else if (value >= 50) {
    // red
    return '#f03b20';
  } else if (value >= 35) {
    // orange
    return '#feb24c';
  } else {
    // yellow
    return '#ffeda0';
  }
}
