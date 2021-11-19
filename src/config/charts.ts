export interface ChartDatumObject {
  date: string;
  value: number;
}

export interface ChartDataObject {
  key: string;
  url: string;
  filetype?: string;
  data?: ChartDatumObject[];
}

export interface ChartObject {
  id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  subType?: string;
  hasAnnotation?: boolean;
  dataSource: string;
  dataHasDate: boolean;
  data: ChartDataObject[];
}

export const charts = [
  {
    id: "bavaria-situation-tiles",
    name: "Bayern: Übersicht heute",
    title: "Corona-Situation in Bayern",
    description: "Die wichtigsten Kennzahlen im Vergleich zum Vortag",
    type: "overview-tiles",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
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
  },
  {
    id: "bavaria-indicators-chart",
    name: "Bayern: Übersicht Entwicklung",
    title: "Corona-Situation in Bayern",
    description: "Langfristige Entwicklung der wichtigsten Kennzahlen",
    type: "overview-chart",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "currentCases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&group=Bundesland&bundesland=Bayern&currentCases=true",
      },
    ],
  },
  {
    id: "bavaria-cases-chart",
    name: "Bayern: Neuinfektionen",
    title: "Neue Corona-Fälle in Bayern",
    description: "Entwicklung der Neuinfektionen nach Erkrankungsdatum",
    type: "infection-chart",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true&group=Bundesland&bundesland=Bayern",
      },
    ],
  },
  {
    id: "bavaria-cases-map",
    name: "Bayern: Inzidenzkarte",
    title: "7-Tage-Inzidenz in Bayern",
    description:
      "Neuinfektionen pro 100.000 Einwohner in den letzten sieben Tagen",
    type: "incidence-map",
    subType: "map-bavaria",
    hasAnnotation: true,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&group=Landkreis&bundesland=Bayern",
      },
    ],
  },
  {
    id: "bavaria-patients-chart",
    name: "Bayern: Intensivpatienten",
    title: "Intensivpatienten in Bayern",
    description:
      "Anzahl der gemeldeten Corona-Fälle in intensivmedizinischer Behandlung",
    type: "intensive-care-chart",
    hasAnnotation: false,
    dataSource: "DIVI-Intensivregister",
    dataHasDate: false,
    data: [
      {
        key: "patients",
        filetype: "json",
        url:
          "https://europe-west3-brdata-corona.cloudfunctions.net/diviApi/query?area=BY&indicator=Patienten",
      },
    ],
  },
  {
    id: "germany-situation-tiles",
    name: "Deutschland: Übersicht heute",
    title: "Corona-Situation in Deutschland",
    description: "Die wichtigsten Kennzahlen im Vergleich zum Vortag",
    type: "overview-tiles",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true",
      },
      {
        key: "recoveries",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&sumField=AnzahlGenesen",
      },
      {
        key: "deaths",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&sumField=AnzahlTodesfall",
      },
    ],
  },
  {
    id: "germany-indicators-chart",
    name: "Deutschland: Übersicht Entwicklung",
    title: "Corona-Situation in Deutschland",
    description: "Langfristige Entwicklung der wichtigsten Kennzahlen",
    type: "overview-chart",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "currentCases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&currentCases=true",
      },
    ],
  },
  {
    id: "germany-cases-chart",
    name: "Deutschland: Neuinfektionen",
    title: "Neue Corona-Fälle in Deutschland",
    description: "Entwicklung der Neuinfektionen nach Erkrankungsdatum",
    type: "infection-chart",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true",
      },
    ],
  },
  {
    id: "germany-cases-map",
    name: "Deutschland: Inzidenzkarte",
    title: "7-Tage-Inzidenz in Deutschland",
    description:
      "Neuinfektionen pro 100.000 Einwohner in den letzten sieben Tagen",
    type: "incidence-map",
    subType: "map-germany",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut, BR-Analyse",
    dataHasDate: true,
    data: [
      {
        key: "cases",
        filetype: "json",
        url:
          "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&group=Landkreis",
      },
    ],
  },
  {
    id: "germany-patients-chart",
    name: "Deutschland: Intensivpatienten",
    title: "Intensivpatienten in Deutschland",
    description:
      "Anzahl der gemeldeten Corona-Fälle in intensivmedizinischer Behandlung",
    type: "intensive-care-chart",
    hasAnnotation: false,
    dataSource: "DIVI-Intensivregister",
    dataHasDate: false,
    data: [
      {
        key: "patients",
        filetype: "json",
        url:
          "https://europe-west3-brdata-corona.cloudfunctions.net/diviApi/query?area=DE&indicator=Patienten",
      },
    ],
  },
  {
    id: "bavaria-vaccinations-chart",
    name: "Bayern & Deutschland: Impffortschritt",
    title: "Corona-Impfungen",
    description:
      "Prozentualer Anteil der geimpften Personen an der Bevölkerung",
    type: "vaccination-chart",
    hasAnnotation: false,
    dataSource: "Robert Koch-Institut",
    dataHasDate: false,
    data: [
      {
        key: "vaccinations-bavaria",
        filetype: "csv",
        url:
          "https://raw.githubusercontent.com/ard-data/2020-rki-impf-archive/master/data/9_csv_v3/region_BY.csv",
      },
      {
        key: "vaccinations-germany",
        filetype: "csv",
        url:
          "https://raw.githubusercontent.com/ard-data/2020-rki-impf-archive/master/data/9_csv_v3/region_DE.csv",
      },
    ],
  },
];
