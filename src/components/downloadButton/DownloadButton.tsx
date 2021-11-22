import React from "react";
// @ts-ignore: No types available
import { saveSvg, saveSvgAsPng, } from "save-svg-as-png";
import { AiOutlineDownload } from "react-icons/ai";

import { Button } from "../settings/styles.Settings";
import { ChartObject } from "../../config/charts";

interface DownloadButtonProps {
  type: string;
  text: string;
  chart: ChartObject;
  svgDom: any;
}

export const DownloadButton = ({ type, text, chart, svgDom }: DownloadButtonProps) => {
  const handleClick = () => {
    if (type === "svg") {
      saveSvg(svgDom.firstChild, `${chart.id}.svg`, { excludeCss: true });
    }
    if (type === "png") {
      saveSvgAsPng(svgDom.firstChild, `${chart.id}.png`, { scale: 2 });
    }
  };

  return (
    <Button onClick={handleClick}>
      <AiOutlineDownload size="1.5rem" /> {text}
    </Button>
  );
};
