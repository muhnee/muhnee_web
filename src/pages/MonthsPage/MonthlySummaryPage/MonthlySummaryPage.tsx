import React, { FC, useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";

import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import SummaryCard from "../../../components/dashboard/SummaryCard";

import MonthlySpendingByCategoryContainer from "../../../containers/MonthlySpendingByCategoryContainer";
import { Summary } from "../../../containers/MonthSummaryContainer/types";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { useUIDispatch } from "../../../contexts/UIProvider";
import { useFirestore } from "../../../firebase/firebase";

import useStyles from "./styles";

/**
 * This page lists summarises the transactions for the month
 */
const MonthlySummaryPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();

  const firestore = useFirestore();
  // Contexts
  const { user } = useContext(AuthenticationContext);
  const uiDispatch = useUIDispatch();

  const [month, setMonth] = useState<Moment>(moment());

  useEffect(() => {
    if (monthId) {
      setMonth(moment(monthId, "YYYY-MM"));
    }
  }, [monthId, setMonth]);

  let targetDate;
  if (month) {
    targetDate = `${month.year()}-${month.month() + 1}`;
  }

  const [summary] = useDocumentData<Summary>(
    user && targetDate
      ? firestore
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
      : null
  );

  /**
   *  NOTE: composite index is required on firestore
   *
   *  Current Configuration:
   *  collection id: transactions
   *
   *  type ASC
   *  timestamp DESC
   */
  const [monthlyExpenses, isMonthlyExpensesLoading] = useCollection(
    user && targetDate
      ? firestore
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
          .collection("transactions")
          .where("type", "==", "expense")
          .orderBy("timestamp", "desc")
      : null
  );

  /**
   *  NOTE: composite index is required on firestore
   *
   *  Current Configuration:
   *  collection id: transactions
   *
   *  type ASC
   *  timestamp DESC
   */
  const [monthlyIncome, isMonthlyIncomeLoading] = useCollection(
    user && targetDate
      ? firestore
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
          .collection("transactions")
          .where("type", "==", "income")
          .orderBy("timestamp", "desc")
      : null
  );

  const classes = useStyles();

  if (!monthId || !month) {
    return <div className={classes.root}>Not Found</div>;
  }

  let currentSavings = 0;

  if (summary) {
    currentSavings = summary.income - summary.expenses;
  }

  let progress = 0;
  if (summary) {
    if (currentSavings > summary.savingsGoal) {
      progress = 100;
    } else {
      progress = (currentSavings / summary.savingsGoal) * 100;
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <Typography variant="h6">{`Summary for ${month.format(
                "MMMM YYYY"
              )}`}</Typography>
            </div>

            <DatePicker
              disableFuture
              openTo="year"
              format="MMM YYYY"
              label="Month to Preview"
              views={["year", "month"]}
              value={month}
              onChange={value => {
                if (value) {
                  history.push(`/months/${value.year()}-${value.month() + 1}`);
                }
              }}
            />
          </div>
        </div>

        <div className={classes.main}>
          <div className={classes.leftContainer}>
            {" "}
            <SummaryCard
              title="Savings"
              displayProgress={true}
              progress={progress}
              amount={
                <span style={{ display: "flex" }}>
                  <Typography>
                    {summary &&
                      `$${(summary.income - summary.expenses).toFixed(2)}/`}
                  </Typography>
                  <Typography color="textSecondary">
                    {summary && `$${summary.savingsGoal.toFixed(2)}`}
                  </Typography>
                  <IconButton
                    style={{ padding: "0.1rem" }}
                    onClick={() =>
                      uiDispatch({
                        type: "@@UI/EDIT_MONTHLY_GOAL_MODAL_OPEN",
                        date: month
                      })
                    }
                  >
                    <EditIcon style={{ width: "0.75rem", height: "0.75rem" }} />
                  </IconButton>
                </span>
              }
              isLoading={isMonthlyIncomeLoading}
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <SummaryCard
                title="Income"
                transactionsTitle="Transactions"
                isLoading={isMonthlyExpensesLoading}
                amount={summary && `$${summary.income.toFixed(2)}`}
                transactions={monthlyIncome}
              />
              <SummaryCard
                title="Expenses"
                transactionsTitle="Transactions"
                isLoading={isMonthlyExpensesLoading}
                amount={summary && `$${summary.expenses.toFixed(2)}`}
                transactions={monthlyExpenses}
              />
            </div>
          </div>
          <div className={classes.rightContainer}>
            <Typography variant="h6" color="textSecondary">
              Spending by Category
            </Typography>
            <MonthlySpendingByCategoryContainer date={month} />
          </div>
        </div>
        <Fab
          variant="extended"
          className={classes.fab}
          color="primary"
          onClick={() =>
            uiDispatch({ type: "@@UI/ADD_TRANSACTION_MODAL_OPEN", date: month })
          }
        >
          <AddIcon className={classes.extendedIcon} />
          Add Transaction
        </Fab>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default MonthlySummaryPage;
