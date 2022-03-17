import { ChartObject, ChartDataObject, ChartDatumObject } from "../../config/charts";

export interface ChartData extends ChartDatumObject {
  [key: string]: any;
}

export interface ChartProps {
  chart: ChartObject;
  chartData: ChartDataObject[];
  startDate: string;
  endDate: string;
  width: number;
  height: number;
  scalingFactor?: number;
  hasLogo?: boolean;
}

export interface MapProps extends ChartProps {
  maxValue?: number;
  minValue?: number;
  minRadius?: number;
  maxRadius?: number;
  hasAnnotation?: boolean;
  hasLabels?: boolean;
}
