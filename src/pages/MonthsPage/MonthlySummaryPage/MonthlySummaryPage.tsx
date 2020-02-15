import React, { FC, useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import SummaryCard from "../../../components/dashboard/SummaryCard";
import MoneyTypography from "../../../components/core/MoneyTypography";

import MonthlySpendingByCategoryContainer from "../../../containers/MonthlySpendingByCategoryContainer";
import { Summary } from "../../../containers/MonthSummaryContainer/types";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { useUIDispatch } from "../../../contexts/UIProvider";
import { useFirestore, useFunctions } from "../../../firebase/firebase";
import { Transaction } from "../../../types/Transaction";

import useStyles from "./styles";

/**
 * This page lists summarises the transactions for the month
 */
const MonthlySummaryPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();

  const firestore = useFirestore();
  const functions = useFunctions();
  // Contexts
  const { user } = useContext(AuthenticationContext);
  const uiDispatch = useUIDispatch();

  const [month, setMonth] = useState<Moment>(moment());
  const [expenseTransactions, setExpenseTransactions] = useState<Transaction[]>(
    []
  );
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>(
    []
  );
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      const getAllTransactions = functions.httpsCallable("getAllTransactions");
      setIsTransactionsLoading(true);
      const res = await getAllTransactions({
        date: month.toISOString(),
        summaryType: "month"
      });

      const income: Transaction[] = [];
      const expense: Transaction[] = [];
      res.data.forEach((trans: any) => {
        const transaction: Transaction = {
          id: trans.id,
          amount: trans.amount,
          description: trans.description,
          category: trans.category,
          taxDeductible: trans.deductible,
          recurringDays: trans.recurringDays,
          type: trans.type,
          timestamp: trans.timestamp
        };

        if (trans.type === "expense") {
          expense.push(transaction);
        } else {
          income.push(transaction);
        }
      });
      setIncomeTransactions(income);
      setExpenseTransactions(expense);
      setIsTransactionsLoading(false);
    }
    if (monthId) {
      setMonth(moment(monthId, "YYYY-MM"));
      getData();
    } else {
      history.push("/");
    }
  }, [monthId, setMonth, functions]);

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

  const classes = useStyles();

  if (!monthId || !month) {
    return <div className={classes.root}>Not Found</div>;
  }

  let currentSavings = 0;
  if (summary && summary.savingsGoal) {
    currentSavings = (summary.income || 0) - (summary.expenses || 0);
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
            <SummaryCard
              title="Savings"
              displayProgress={true}
              progress={progress}
              amount={
                <span style={{ display: "flex" }}>
                  <MoneyTypography
                    variant="body1"
                    type={currentSavings < 0 ? "expense" : "income"}
                  >
                    {summary && currentSavings >= 0
                      ? `$${currentSavings.toFixed(2)}/`
                      : `-$${Math.abs(currentSavings).toFixed(2)}/`}
                  </MoneyTypography>
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
              isLoading={isTransactionsLoading}
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <SummaryCard
                title="Income"
                transactionsTitle="Transactions"
                isLoading={isTransactionsLoading}
                amount={
                  summary &&
                  `$${summary.income ? summary.income.toFixed(2) : 0}`
                }
                transactions={incomeTransactions}
                showGraph={true}
              />
              <SummaryCard
                title="Expenses"
                transactionsTitle="Transactions"
                isLoading={isTransactionsLoading}
                amount={
                  summary &&
                  `$${summary.expenses ? summary.expenses.toFixed(2) : 0}`
                }
                transactions={expenseTransactions}
                showGraph={true}
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
