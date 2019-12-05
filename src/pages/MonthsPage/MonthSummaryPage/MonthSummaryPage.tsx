import React, { FC, useState, useContext } from "react";
import firebase from "firebase";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import LeftArrowIcon from "@material-ui/icons/ChevronLeft";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { blueGrey } from "@material-ui/core/colors";

type Summary = {
  income: number;
  expense: number;
};
type MonthlySummary = {
  [timestamp: string]: Summary;
};

type MonthlySummaryItem = {
  date: moment.Moment;
  displayDate: string;
  expense: number;
  income: number;
  label: string;
};

type ChartTooltipItem = {
  color?: string;
  datekey?: string;
  fill?: string;
  formatter?: string;
  payload: MonthlySummaryItem;
  type?: string;
  unit?: string;
  value: number;
};

interface ChartLabelProps {
  payload: ChartTooltipItem[];
  active: boolean;
}

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

const MonthSummaryPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const [currentMonth, setCurrentMonth] = useState(moment());

  const classes = useStyles();

  const monthRef = `${currentMonth.year()}-${currentMonth.month()}`;
  const [monthlyTransactions, loading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(monthRef)
          .collection("transactions")
          .orderBy("timestamp", "asc")
      : null
  );

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

  if (!loading && monthlyTransactions) {
    monthlyTransactions.docs.forEach(doc => {
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
        label: moment(date).format("DD/MM"),
        ...monthlySummary[date]
      };
    }
  );

  return (
    <div className={classes.root}>
      <div className={classes.monthControl}>
        <IconButton
          onClick={() =>
            setCurrentMonth(moment(currentMonth.subtract(1, "month")))
          }
        >
          <LeftArrowIcon />
        </IconButton>
        <Typography>{currentMonth.format("MMM YYYY")}</Typography>
        <IconButton
          onClick={() => setCurrentMonth(moment(currentMonth.add(1, "month")))}
        >
          <RightArrowIcon />
        </IconButton>
      </div>
      <div className={classes.summaryChartRow}>
        <BarChart
          width={700}
          height={300}
          data={summary}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label"></XAxis>
          <YAxis />
          <Tooltip content={ChartLabel} />
          <Legend />
          <Bar dataKey="income" stackId="a" fill="#8884d8" unit="$" />
          <Bar dataKey="expense" stackId="a" fill="#82ca9d" unit="$" />
        </BarChart>
      </div>
    </div>
  );
};

export default MonthSummaryPage;
