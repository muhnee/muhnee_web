import React, { FC } from "react";
import moment from "moment";

import { XAxis, Tooltip, LineChart, Line } from "recharts";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { blueGrey } from "@material-ui/core/colors";
import {
  MonthSummaryContainerProps,
  ChartLabelProps,
  MonthlySummary,
  MonthlySummaryItem
} from "./types";

const ChartLabel: FC<ChartLabelProps> = ({ payload, active }) => {
  if (active) {
    const data = payload[0].payload;
    return (
      <Paper style={{ padding: "0.5rem", backgroundColor: blueGrey[300] }}>
        <div>
          <Typography variant="h6">{`${data.date.format(
            "Do MMM YYYY"
          )}`}</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "0.75rem" }}>
            <Typography variant="body1">{`Expense`}</Typography>
          </div>
          <Typography variant="body1">{`$${data.expense.toFixed(
            2
          )}`}</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "0.75rem" }}>
            <Typography variant="body1">{`Income`}</Typography>
          </div>
          <Typography variant="body1">{`$${data.income.toFixed(
            2
          )}`}</Typography>
        </div>
      </Paper>
    );
  }
  return null;
};

const MonthSummaryContainer: FC<MonthSummaryContainerProps> = ({
  currentMonth,
  transactions,
  isLoading
}) => {
  const days = currentMonth.daysInMonth();
  let monthlySummary: MonthlySummary = {};
  for (let i = 0; i < days; i++) {
    let date = moment(currentMonth)
      .startOf("month")
      .add(i, "days");
    monthlySummary[date.format("YYYY-MM-DD")] = {
      income: 0,
      expense: 0
    };
  }

  if (!isLoading && transactions) {
    transactions.docs.forEach(doc => {
      let docData: any = doc.data();
      const date: string = moment(docData.timestamp.toDate()).format(
        "YYYY-MM-DD"
      );
      if (monthlySummary[date]) {
        if (docData.type === "expense") {
          monthlySummary[date]["expense"] += docData.amount;
        } else {
          monthlySummary[date]["income"] += docData.amount;
        }
      }
    });
  }

  const summary: MonthlySummaryItem[] = Object.keys(monthlySummary).map(
    date => {
      return {
        displayDate: moment(date).format("DD/MM/YYYY"),
        date: moment(date),
        label: moment(date).format("Do MMM"),
        ...monthlySummary[date]
      };
    }
  );

  return (
    <LineChart
      width={280}
      height={300}
      data={summary}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="label"></XAxis>
      <Tooltip content={ChartLabel} />
      <Line type="monotone" dataKey="income" stroke="#82ca9d" unit="$" />
      <Line type="monotone" dataKey="expense" stroke="#8884d8" unit="$" />
    </LineChart>
  );
};

export default MonthSummaryContainer;
