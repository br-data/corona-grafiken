export interface ChartDataObject {
  key: string;
  url: string;
  filetype?: string;
  data?: any;
}

export interface ChartObject {
  id: string;
  name: string;
  title: string;
  description: string;
  dataSource: string;
  data: ChartDataObject[];
  type: string;
}

export const charts = [
  {
    id: "bavaria-situation-tiles",
    title: "Corona-Situation in Bayern",
    name: "Der wichtigsten Kennzahlen im Vergleich zum Vortag",
    description: "Der wichtigsten Kennzahlen im Vergleich zum Vortag",
    dataSource: "Robert Koch-Institut, BR-Analyse",
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern",
      },
      {
        key: "recoveries",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern&sumField=AnzahlGenesen",
      },
      {
        key: "deaths",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern&sumField=AnzahlTodesfall",
      },
    ],
    type: "tile-chart",
  },
  {
    id: "bavaria-indicators-chart",
    name: "Corona-Situation in Bayern",
    title: "Corona-Situation in Bayern",
    description: "Langfristige Entwicklung der wichtigsten Kennzahlen",
    dataSource: "Robert Koch-Institut, BR-Analyse",
    data: [
      {
        key: "currentCases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&group=Bundesland&bundesland=Bayern&currentCases=true",
      },
    ],
    type: "area-chart",
  },
  {
    id: "bavaria-cases-chart",
    name: "Neue Corona-Fälle in Bayern",
    title: "Neue Corona-Fälle in Bayern",
    description: "Entwicklung der Neuinfektionen nach Erkrankungsdatum",
    dataSource: "Robert Koch-Institut, BR-Analyse",
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true&group=Bundesland&bundesland=Bayern",
      },
    ],
    type: "bar-chart",
  },
  {
    id: "bavaria-cases-map",
    name: "7-Tage-Inzidenz in Bayern",
    title: "7-Tage-Inzidenz in Bayern",
    description: "Neuinfektionen pro 100.000 Einwohner in den letzten sieben Tagen",
    dataSource: "Robert Koch-Institut, BR-Analyse",
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&group=Landkreis&bundesland=Bayern",
      },
    ],
    type: "map",
  },
  {
    id: "bavaria-patients-chart",
    name: "Intensivpatienten in Bayern",
    title: "Intensivpatienten in Bayern",
    description: "Anzahl der gemeldeten Corona-Fälle in intensivmedizinischer Behandlung",
    dataSource: "DIVI-Intensivregister",
    data: [
      {
        key: "patients",
        filetype: "json",
        url:
          "https://europe-west3-brdata-corona.cloudfunctions.net/diviApi/query?area=BY&indicator=Patienten",
      },
    ],
    type: "line-chart",
  },
  {
    id: "bavaria-vaccinations-chart",
    name: "Corona-Impfungen in Bayern und Deutschland",
    title: "Corona-Impfungen in Bayern und Deutschland",
    description:
      "Prozentualer Anteil der geimpften Personen an der Bevölkerung",
    dataSource: "Robert Koch-Institut",
    data: [
      {
        key: "vaccinations-bavaria",
        filetype: "csv",
        url:
          "https://raw.githubusercontent.com/ard-data/2020-rki-impf-archive/master/data/9_csv_v2/region_BY.csv",
      },
      {
        key: "vaccinations-germany",
        filetype: "csv",
        url:
          "https://raw.githubusercontent.com/ard-data/2020-rki-impf-archive/master/data/9_csv_v2/region_DE.csv",
      },
    ],
    type: "progress-chart",
  },
];
