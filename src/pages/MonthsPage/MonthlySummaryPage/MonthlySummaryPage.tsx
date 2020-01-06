import React, { FC, useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import MonthlySummaryCard from "../../../components/cards/MonthlySummaryCard";

import MonthTransactionsContainer from "../../../containers/MonthTransactionsContainer";
import MonthlySpendingByCategoryContainer from "../../../containers/MonthlySpendingByCategoryContainer";
import { Summary } from "../../../containers/MonthSummaryContainer/types";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { useUIDispatch } from "../../../contexts/UIProvider";

import useStyles from "./styles";

/**
 * This page lists summarises the transactions for the month
 */
const MonthlySummaryPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();
  // Contexts
  const { user } = useContext(AuthenticationContext);
  const uiDispatch = useUIDispatch();

  const [month, setMonth] = useState<Moment | null>(moment());

  useEffect(() => {
    if (monthId) {
      setMonth(moment(monthId, "YYYY-MM"));
    }
  }, [monthId, setMonth]);

  const [summary, isSummaryLoading, hasSummaryErrored] = useDocumentData<
    Summary
  >(
    user && month
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(`${month.year()}-${month.month() + 1}`)
      : null
  );

  const classes = useStyles();

  if (!monthId || !month) {
    return <div className={classes.root}>Not Found</div>;
  }

  let savings;

  if (summary) {
    savings = (summary.income || 0) - (summary.expenses || 0);
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <Button onClick={() => history.goBack()}>&larr; Go Back</Button>
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
          <div>
            <Typography variant="h6">{`Summary for ${month.format(
              "MMMM YYYY"
            )}`}</Typography>
          </div>
          <div className={classes.monthlySummaryContainer}>
            <MonthlySummaryCard
              title="Income this month"
              value={`$${
                summary && summary.income ? summary.income.toFixed(2) : "0.00"
              }`}
              isLoading={isSummaryLoading}
              hasErrored={Boolean(hasSummaryErrored)}
            />
            <MonthlySummaryCard
              title="Expenses this month"
              value={`$${
                summary && summary.expenses
                  ? summary.expenses.toFixed(2)
                  : "0.00"
              }`}
              isLoading={isSummaryLoading}
              hasErrored={Boolean(hasSummaryErrored)}
            />
            <MonthlySummaryCard
              title="Total Savings"
              value={`$${savings ? savings.toFixed(2) : "0.00"}`}
              isLoading={isSummaryLoading}
              hasErrored={Boolean(hasSummaryErrored)}
            />
            <MonthlySummaryCard
              title="Monthly Goal"
              value={`$${
                summary && summary.savingsGoal
                  ? summary.savingsGoal.toFixed(2)
                  : "0.00"
              }`}
              isLoading={isSummaryLoading}
              hasErrored={Boolean(hasSummaryErrored)}
              secondaryAction={
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
              }
            />
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.leftContainer}>
            <Typography variant="h6" color="textSecondary">
              Transactions this month
            </Typography>
            <MonthTransactionsContainer month={month} />
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
