export interface ChartObject {
  id: string,
  title: string,
  description: string,
  dataSource: string,
  dataUrl: string,
  type: string
}

export const charts = [
  {
    id: 'bavaria-situation-tiles',
    title: 'Corona-Situation in Bayern',
    description: 'Überblick der wichtigsten Kennzahlen',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    dataUrl: '',
    type: 'tiles'
  },
  {
    id: 'bavaria-cases-chart',
    title: 'Corona-Neuinfektionen in Bayern',
    description: 'Entwicklung der Neuinfektionen nach Erkrankungsdatum',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    dataUrl: '',
    type: 'bar-chart'
  },
  {
    id: 'bavaria-indicators-chart',
    title: 'Corona in Bayern',
    description: 'Entwicklung der wichtigsten Kennzahlen nach Erkrankungsdatum',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    dataUrl: '',
    type: 'area-chart'
  },
  {
    id: 'bavaria-cases-map',
    title: '7-Tage-Inzidenz in Bayern',
    description: 'Neuinfektionen pro 100.000 Einwohner in den letzten sieben Tagen',
    dataSource: 'Robert Koch-Institut, BR-Analyse',
    dataUrl: '',
    type: 'map'
  },
  {
    id: 'bavaria-vaccinations-chart',
    title: 'Corona-Impfungen in Bayern',
    description: 'Prozentualer Anteil der geimpften Personen an der Bevölkerung',
    dataSource: 'Robert Koch-Institut',
    dataUrl: '',
    type: 'simple-chart'
  },
  {
    id: 'bavaria-patients-chart',
    title: 'Intensivpatienten in Bayern',
    description: 'Anzahl der gemeldeten Corona-Fälle in intensivmedizinischer Behandlung',
    dataSource: 'DIVI-Intensivregister',
    dataUrl: '',
    type: 'line-chart'
  }
];
