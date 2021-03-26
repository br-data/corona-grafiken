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
    id: "instagram-1-1",
    name: "Instagram (1:1)",
    width: 540,
    height: 540,
    scalingFactor: 1,
  },
  {
    id: "instagram-4-5",
    name: "Instagram (4:5)",
    width: 540,
    height: 675,
    scalingFactor: 1,
  },
  {
    id: "twitter-16-9",
    name: "Twitter, 1 Bild (16:9)",
    width: 600,
    height: 337.5,
    scalingFactor: 0.85,
  },
  {
    id: "twitter-7-8",
    name: "Twitter, 2 Bilder (7:8)",
    width: 600,
    height: 685.7,
    scalingFactor: 1,
  },
  {
    id: "twitter-2-1",
    name: "Twitter, 4 Bilder (16:9)",
    width: 600,
    height: 337.5,
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
