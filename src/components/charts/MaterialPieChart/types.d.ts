import { RechartsFunction } from "recharts";

export default interface MaterialPieChartProps {
  data?: readonly object[] | null;

  label?: string;

  onMouseEnter?: RechartsFunction;

  onMouseLeave?: RechartsFunction;
}
