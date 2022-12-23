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
    hasLabels?: boolean;
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
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-bl-aktuell?filter=bundeslandId==9",
            },

            {
                key: "recoveries",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-bl?filter=bundeslandId==9",
            },
            {
                key: "deaths",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-bl-aktuell?filter=bundeslandId==9",
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
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "currentCases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-bl?filter=meldedatum>=${startDate}&filter=bundeslandId==9",
            },
        ],
    },
    {
        id: "bavaria-cases-chart",
        name: "Bayern: Neuinfektionen",
        title: "Neue Corona-Fälle in Bayern",
        description: "Entwicklung der Neuinfektionen nach Meldedatum",
        type: "infection-chart",
        hasAnnotation: false,
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-bl?filter=meldedatum>=${startDate}&filter=bundeslandId==9",

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
        hasLabels: true,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-lk-aktuell?filter=bundeslandId==9",

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
        hasLabels: false,
        dataSource: "DIVI-Intensivregister",
        dataHasDate: true,
        data: [
            {
                key: "patients",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/intensivpatienten-bl?filter=datum>=${startDate}&filter=bundesland==Bayern",
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
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-de-aktuell",
            },
            {
                key: "recoveries",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-de",
            },
            {
                key: "deaths",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-de-aktuell",
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
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "currentCases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-de?filter=meldedatum>=${startDate}",
            },
        ],
    },
    {
        id: "germany-cases-chart",
        name: "Deutschland: Neuinfektionen",
        title: "Neue Corona-Fälle in Deutschland",
        description: "Entwicklung der Neuinfektionen nach Meldedatum",
        type: "infection-chart",
        hasAnnotation: false,
        hasLabels: false,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-de?filter=meldedatum>=${startDate}",
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
        hasLabels: true,
        dataSource: "Robert Koch-Institut, BR-Analyse",
        dataHasDate: true,
        data: [
            {
                key: "cases",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/infektionen-lk-aktuell",
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
        hasLabels: false,
        dataSource: "DIVI-Intensivregister",
        dataHasDate: true,
        data: [
            {
                key: "patients",
                filetype: "json",
                url:
                    "https://corona-api.interaktiv.br.de/query/intensivpatienten-de?filter=datum>=${startDate}",
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
        hasLabels: false,
        dataSource: "Robert Koch-Institut",
        dataHasDate: false,
        data: [
            {
                key: "vaccinations-bavaria",
                filetype: "csv",
                url:
                    "https://corona-api.interaktiv.br.de/query/impfungen-aktuell?filter=bundeslandId==9"
            },
            {
                key: "vaccinations-germany",
                filetype: "csv",
                url:
                    "https://corona-api.interaktiv.br.de/query/impfungen-aktuell?filter=bundeslandId==0",
            },
        ],
    },
];
