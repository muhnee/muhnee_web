import { RechartsFunction } from "recharts";

export default interface MaterialPieChartProps {
  data?: readonly object[] | null;

  activeIndex?: number | null;

  label?: string;

  onMouseEnter?: RechartsFunction;

  onMouseLeave?: RechartsFunction;
}
