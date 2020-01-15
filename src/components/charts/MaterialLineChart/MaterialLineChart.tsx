import React, { FC } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  LabelList,
  Line,
  LineChart
} from "recharts";

import ChartTooltip from "../Tooltip";

import { Theme, useTheme } from "@material-ui/core";

import MaterialLineChartProps from "./types";
import useStyles from "./styles";

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
  const classes = useStyles();
  const {
    data = [],
    lineColor = theme.palette.primary.main,
    height = 150
  } = props;
  console.log(data);
  return (
    <div className={classes.root}>
      <ResponsiveContainer maxHeight={300} width="100%" height={height}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="amount" stroke={lineColor} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaterialLineChart;
