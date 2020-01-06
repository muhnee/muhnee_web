import React, { FC, useContext, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import moment, { Moment } from "moment";

import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import SummaryCard from "../../components/dashboard/SummaryCard";

import MonthlySpendingByCategoryContainer from "../../containers/MonthlySpendingByCategoryContainer";

import AddIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useUIDispatch } from "../../contexts/UIProvider";
import { Summary } from "../../types/Summary";

import useStyles from "./styles";
import { IconButton } from "@material-ui/core";

const DashboardPage: FC = () => {
  const history = useHistory();
  const uiDispatch = useUIDispatch();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const [thisMonth, setThisMonth] = useState<Moment>(moment());
  const classes = useStyles();

  const targetDate = `${thisMonth.year()}-${thisMonth.month() + 1}`;

  const [monthlyExpenses, isMonthlyExpensesLoading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
          .collection("transactions")
          .where("type", "==", "expense")
          .orderBy("timestamp", "desc")
          .limit(3)
      : null
  );

  const [monthlyIncome, isMonthlyIncomeLoading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
          .collection("transactions")
          .where("type", "==", "income")
          .orderBy("timestamp", "desc")
          .limit(3)
      : null
  );

  const [summary] = useDocumentData<Summary>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }

  let currentSavings = 0;
  if (summary) {
    currentSavings = summary.income - summary.expenses;
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">
            <strong>Overview -</strong>{" "}
            <span className={classes.monthTitle}>
              {thisMonth.format("MMMM YYYY")}
            </span>
          </Typography>
        </div>
        <ButtonGroup color="primary" aria-label=" outlined button group">
          <Button
            variant={
              targetDate === `${moment().year()}-${moment().month() + 1}`
                ? "contained"
                : "outlined"
            }
            onClick={() => setThisMonth(moment())}
          >
            This Month
          </Button>
          <Button
            variant={
              targetDate ===
              `${moment()
                .subtract(1, "month")
                .year()}-${moment()
                .subtract(1, "month")
                .month() + 1}`
                ? "contained"
                : "outlined"
            }
            onClick={() => setThisMonth(moment().subtract(1, "month"))}
          >
            Last Month
          </Button>
        </ButtonGroup>
      </div>
      <div className={classes.row}>
        <div className={clsx(classes.row)} style={{ flex: 2 }}>
          <div className={classes.leftContainer}>
            <div className={classes.summaryContainer}>
              <SummaryCard
                title="Savings"
                displayProgress={true}
                progress={
                  summary && ((currentSavings / summary.savingsGoal) * 100 || 0)
                }
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
                          date: thisMonth
                        })
                      }
                    >
                      <EditIcon
                        style={{ width: "0.75rem", height: "0.75rem" }}
                      />
                    </IconButton>
                  </span>
                }
                isLoading={isMonthlyIncomeLoading}
              />
            </div>
            <div className={classes.summaryContainer}>
              <SummaryCard
                title="Expenses"
                amount={summary && `$${summary.expenses.toFixed(2)}`}
                transactions={monthlyExpenses}
                isLoading={isMonthlyExpensesLoading}
              />
              <SummaryCard
                title="Income"
                amount={summary && `$${summary.income.toFixed(2)}`}
                transactions={monthlyIncome}
                isLoading={isMonthlyIncomeLoading}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                onClick={() => {
                  history.push(
                    `/months/${thisMonth.year()}-${thisMonth.month() + 1}`
                  );
                }}
              >
                View All Transactions
              </Button>
            </div>
            <Divider style={{ margin: "0.25rem 0" }} />
            <div style={{ marginTop: "1.25rem" }}>
              <Typography variant="h6">Spend by Category</Typography>
              <MonthlySpendingByCategoryContainer date={thisMonth} />
            </div>
          </div>
        </div>
      </div>
      <Fab
        variant="extended"
        className={classes.fab}
        color="primary"
        onClick={() =>
          uiDispatch({
            type: "@@UI/ADD_TRANSACTION_MODAL_OPEN",
            date: thisMonth
          })
        }
      >
        <AddIcon className={classes.extendedIcon} />
        Add Transaction
      </Fab>
    </div>
  );
};

export default DashboardPage;
