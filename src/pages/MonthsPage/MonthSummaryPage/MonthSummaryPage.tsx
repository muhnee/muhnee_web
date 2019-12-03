import React, { FC, useState, useContext } from "react";
import firebase from "firebase";
import moment from "moment";
import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import { Animation } from "@devexpress/dx-react-chart";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import LeftArrowIcon from "@material-ui/icons/ChevronLeft";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import AuthenticationContext from "../../../contexts/AuthenticationContext";

import CategoriesContext from "../../../contexts/CategoriesContext";

const MonthSummaryPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { categoryMap } = useContext(CategoriesContext);
  const [currentMonth, setCurrentMonth] = useState(moment());

  const classes = useStyles();

  const monthRef = `${currentMonth.year()}-${currentMonth.month()}`;
  const [monthlyTransactions, loading, error] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(monthRef)
          .collection("transactions")
          .orderBy("timestamp", "desc")
      : null
  );

  let categorySummary: any = { income: {}, expense: {} };

  if (!loading && monthlyTransactions) {
    monthlyTransactions.docs.forEach(doc => {
      let docData: any = doc.data();
      if (categorySummary[docData.type][docData.category]) {
        categorySummary[docData.type][docData.category]["amount"] +=
          docData.amount;
      } else {
        if (docData.type === "income") {
          categorySummary[docData.type][docData.category] = {
            amount: docData.amount,
            name: categoryMap["income"][docData.category]
          };
        } else {
          categorySummary[docData.type][docData.category] = {
            amount: docData.amount,
            name: categoryMap["expense"][docData.category]
          };
        }
      }
    });
  }

  const expenseData = Object.keys(categorySummary.expense).map(key => {
    const expenseCategory = categorySummary.expense[key];
    return { name: expenseCategory.name, amount: expenseCategory.amount };
  });
  console.log(expenseData);

  return (
    <div>
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
      <div>
        <Chart data={expenseData}>
          <PieSeries valueField="amount" argumentField="name" />
          <Legend />
          <Tooltip />
          <Title text="Expense by category" />
          <Animation />
        </Chart>
      </div>
    </div>
  );
};

export default MonthSummaryPage;
