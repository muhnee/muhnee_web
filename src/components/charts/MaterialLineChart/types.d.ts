import { RechartsFunction } from "recharts";

export default interface MaterialLineChartProps {
  data?: readonly object[];

  activeIndex?: number | null;

  label?: string;

  onMouseEnter?: RechartsFunction;

  onMouseLeave?: RechartsFunction;

  lineColor?: string;

  height?: number;
}
