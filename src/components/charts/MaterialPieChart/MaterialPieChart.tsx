import React, { FC } from "react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from "recharts";

import Paper from "@material-ui/core/Paper";
import { useTheme, Theme } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";

import MaterialPieChartProps from "./types";

const CustomTooltip: FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    return (
      <Paper>
        <p className="label">{`${payload[0].payload["category"]["name"]} : $${payload[0].value}`}</p>
      </Paper>
    );
  }

  return null;
};

const MaterialPieChart: FC<MaterialPieChartProps> = ({ data, label }) => {
  const theme: Theme = useTheme();
  const COLORS = [theme.palette.primary.main, blue[500], green[500]];
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
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MaterialPieChart;
