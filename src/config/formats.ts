export interface FormatObject {
  id: string;
  name: string;
  ratio: string;
  width: number;
  height: number;
  scalingFactor: number;
}

export const formats = [
  {
    id: "instagram",
    name: "Instagram (1:1)",
    width: 540,
    height: 540,
    scalingFactor: 1,
  },
  {
    id: "twitter",
    name: "Twitter (2:1)",
    width: 600,
    height: 300,
    scalingFactor: 0.85,
  },
  {
    id: "facebook",
    name: "Facebook (1.9:1)",
    width: 600,
    height: 315,
    scalingFactor: 0.85,
  },
  {
    id: "br24",
    name: "BR24-Artikel (16:9)",
    width: 800,
    height: 450,
    scalingFactor: 1,
  },
  {
    id: "hd-tv",
    name: "HD-Fernsehen (16:9)",
    width: 960,
    height: 540,
    scalingFactor: 1,
  },
];
