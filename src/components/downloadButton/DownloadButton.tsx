import React from "react";
  // @ts-ignore: No types available
import { saveSvg, saveSvgAsPng } from "../../../node_modules/save-svg-as-png/lib/saveSvgAsPng.js";

import { Button } from "./styles.DownloadButton";

interface DownloadButtonProps {
  type: string;
  text: string;
  svgDom: any;
}

export const DownloadButton = ({
  type,
  text,
  svgDom,
}: DownloadButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (type === "svg") {
      saveSvg(svgDom.firstChild, "image.svg");
    }
    if (type === "png") {
      saveSvgAsPng(svgDom.firstChild, "image.png");
    }
  };

  return (
    <Button
      onClick={handleClick}
    >{text}</Button>
  );
};
