import React, { FC, useState, useContext } from "react";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import MonthlySummaryCard from "../../../components/cards/MonthlySummaryCard";
import UpdateMonthlyGoalDialog from "../../../components/dialogs/UpdateMonthlyGoalDialog";

import MonthTransactionsContainer from "../../../containers/MonthTransactionsContainer";
import { Summary } from "../../../containers/MonthSummaryContainer/types";

import useStyles from "./styles";
import AuthenticationContext from "../../../contexts/AuthenticationContext";

/**
 * This page lists summarises the transactions for the month
 */
const MonthlySummaryPage: FC = () => {
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
  const [
    isUpdateMonthlyGoalModalOpen,
    setIsUpdateMonthlyGoalModalOpen
  ] = useState(false);

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
    savings = (summary.income || 0) - (summary.expenses || 0);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Button onClick={() => history.goBack()}>&larr; Go Back</Button>
        </div>
        <div>
          <Typography variant="h6">{`Summary for ${date.format(
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
              summary && summary.expenses ? summary.expenses.toFixed(2) : "0.00"
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
                onClick={() => setIsUpdateMonthlyGoalModalOpen(true)}
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
          <MonthTransactionsContainer
            month={date}
            shouldDisplayAddTransactionModal={true}
            isAddTransactionModalOpen={isAddTransactionModalOpen}
            onAddTransactionModalClose={() =>
              setIsAddTransactionModalOpen(false)
            }
          />
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="h6" color="textSecondary">
            Spending by Category
          </Typography>
        </div>
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
      <UpdateMonthlyGoalDialog
        open={isUpdateMonthlyGoalModalOpen}
        date={date}
        onClose={() => setIsUpdateMonthlyGoalModalOpen(false)}
      />
    </div>
  );
};

export default MonthlySummaryPage;
