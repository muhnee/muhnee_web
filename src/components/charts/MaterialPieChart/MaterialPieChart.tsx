import React, { FC } from "react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from "recharts";

import { useTheme, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import ChartTooltip from "../Tooltip";

import MaterialPieChartProps from "./types";

const CustomTooltip: FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    return (
      <ChartTooltip
        title={payload[0].payload["name"]}
        description={`Amount: $${payload[0].value}`}
      />
    );
  }

  return null;
};

const MaterialPieChart: FC<MaterialPieChartProps> = ({
  data,
  label,
  activeIndex = null,
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}) => {
  const theme: Theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    green[500]
  ];

  if (!data) {
    return null;
  }

  return (
    <ResponsiveContainer maxHeight={300} width="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {data.map((entry, index) => {
            const color =
              activeIndex === null
                ? COLORS[index % COLORS.length]
                : activeIndex === index
                ? COLORS[index % COLORS.length]
                : "#ccc";
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MaterialPieChart;
