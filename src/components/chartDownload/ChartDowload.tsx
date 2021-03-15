import React from "react";
// @ts-ignore: No types available
import { saveSvg, saveSvgAsPng, } from "save-svg-as-png";
import { FiDownload } from "react-icons/fi";

import { Button } from "../chartSettings/styles.ChartSettings";
import { ChartObject } from "../../config/charts";

interface DownloadButtonProps {
  type: string;
  text: string;
  chart: ChartObject;
  svgDom: any;
}

export const DownloadButton = ({ type, text, chart, svgDom }: DownloadButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (type === "svg") {
      saveSvg(svgDom.firstChild, `${chart.id}.svg`, { excludeCss: true });
    }
    if (type === "png") {
      saveSvgAsPng(svgDom.firstChild, `${chart.id}.png`, { scale: 2 });
    }
  };

  return (
    <Button onClick={handleClick}>
      <FiDownload size="1.2rem" /> {text}
    </Button>
  );
};