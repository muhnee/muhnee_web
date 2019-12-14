import React, { FC, useState, useContext } from "react";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import MonthTransactionsContainer from "../../../containers/MonthTransactionsContainer";

import useStyles from "./styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBox";
import AuthenticationContext from "../../../contexts/AuthenticationContext";

import { Summary } from "../../../containers/MonthSummaryContainer/types";
import MonthlySummaryCard from "../../../components/cards/MonthlySummaryCard";

/**
 * This page lists all the transactions for the month
 */
const TransactionsPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();
  const date: Moment = moment(monthId, "YYYY-MM");

  // Contexts
  const { user } = useContext(AuthenticationContext);
  // State
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(
    false
  );

  const [summary, isSummaryLoading, hasSummaryErrored] = useDocumentData<
    Summary
  >(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(`${date.year()}-${date.month() + 1}`)
      : null
  );

  const classes = useStyles();

  if (!monthId) {
    return <div className={classes.root}>Not Found</div>;
  }

  let savings;

  if (summary) {
    savings = (summary.income || 0) - (summary.expense || 0);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Button onClick={() => history.goBack()}>&larr; Go Back</Button>
        </div>
        <div>
          <Typography variant="h6">{`Transactions for ${date.format(
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
              summary && summary.expense ? summary.expense.toFixed(2) : "0.00"
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
          />
        </div>
      </div>
      <div className={classes.main}>
        <Typography variant="h6" color="textSecondary">
          Transactions this month
        </Typography>
        <MonthTransactionsContainer
          month={date}
          shouldDisplayAddTransactionModal={true}
          isAddTransactionModalOpen={isAddTransactionModalOpen}
          onAddTransactionModalClose={() => setIsAddTransactionModalOpen(false)}
        />
      </div>
      <Fab
        variant="extended"
        className={classes.fab}
        color="primary"
        onClick={() => setIsAddTransactionModalOpen(true)}
      >
        <AddIcon className={classes.extendedIcon} />
        Add Transaction
      </Fab>
    </div>
  );
};

export default TransactionsPage;
