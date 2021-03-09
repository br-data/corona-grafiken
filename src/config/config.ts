export interface ChartObject {
  id: string,
  title: string,
  description: string,
  dataSource: string,
  data: { key: string, url: string, data?: any }[],
  type: string
}

export const charts = [
  {
    id: 'bavaria-situation-tiles',
    title: 'Corona-Situation in Bayern',
    description: 'Überblick der wichtigsten Kennzahlen',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    data: [
      {
        key: 'cases',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern'
      },
      {
        key: 'recoveries',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern&sumField=AnzahlGenesen'
      },
      {
        key: 'deaths',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&newCases=true&group=Bundesland&bundesland=Bayern&sumField=AnzahlTodesfall'
      }
    ],
    type: 'tiles'
  },
  {
    id: 'bavaria-cases-chart',
    title: 'Corona-Neuinfektionen in Bayern',
    description: 'Entwicklung der Neuinfektionen nach Erkrankungsdatum',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    data: [
      {
        key: 'cases',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true&group=Bundesland&bundesland=Bayern'
      }
    ],
    type: 'bar-chart'
  },
  {
    id: 'bavaria-indicators-chart',
    title: 'Corona in Bayern',
    description: 'Entwicklung der wichtigsten Kennzahlen nach Erkrankungsdatum',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    data: [
      {
        key: 'currentCases',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&group=Bundesland&bundesland=Bayern&currentCases=true'
      }
    ],
    type: 'area-chart'
  },
  {
    id: 'bavaria-cases-map',
    title: '7-Tage-Inzidenz in Bayern',
    description: 'Neuinfektionen pro 100.000 Einwohner in den letzten sieben Tagen',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    data: [
      {
        key: 'cases',
        url: 'https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&group=Landkreis&bundesland=Bayern'
      }
    ],
    type: 'map'
  },
  {
    id: 'bavaria-vaccinations-chart',
    title: 'Corona-Impfungen in Bayern',
    description: 'Prozentualer Anteil der geimpften Personen an der Bevölkerung',
    dataSource: 'Robert Koch-Institut',
    data: [
      {
        key: 'vaccinations',
        url: 'https://raw.githubusercontent.com/ard-data/2020-rki-impf-archive/master/data/9_csv_v2/region_BY.csv'
      }
    ],
    type: 'simple-chart'
  },
  {
    id: 'bavaria-patients-chart',
    title: 'Intensivpatienten in Bayern',
    description: 'Anzahl der gemeldeten Corona-Fälle in intensivmedizinischer Behandlung',
    dataSource: 'DIVI-Intensivregister',
    data: [
      {
        key: 'patients',
        url: 'https://europe-west3-brdata-corona.cloudfunctions.net/diviApi/query?area=BY&indicator=Patienten'
      }
    ],
    type: 'line-chart'
  }
];
