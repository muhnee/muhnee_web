import React, { FC } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  Line,
  LineChart
} from "recharts";

import { Theme, useTheme } from "@material-ui/core";

import MaterialLineChartProps from "./types";

import ChartTooltip from "../Tooltip";

const CustomTooltip: FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    return (
      <ChartTooltip
        title={moment(payload[0].payload["date"]).format("Do MMM YYYY")}
        description={`Amount: $${payload[0].value}`}
      />
    );
  }

  return null;
};

const MaterialLineChart: FC<MaterialLineChartProps> = props => {
  const theme: Theme = useTheme();
  const {
    data = [],
    lineColor = theme.palette.primary.main,
    height = 150
  } = props;
  console.log(data);
  return (
    <ResponsiveContainer maxHeight={300} width="100%" height={height}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="amount" stroke={lineColor} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MaterialLineChart;
