import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import moment, { Moment } from "moment";

import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import SummaryCard from "../../components/dashboard/SummaryCard";

import MonthSummaryContainer from "../../containers/MonthSummaryContainer";
import MonthTransactionsContainer from "../../containers/MonthTransactionsContainer";

import AddIcon from "@material-ui/icons/AddBox";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Summary } from "../../types/Summary";

import useStyles from "./styles";

const DashboardPage: FC = () => {
  const lastMonth = moment().subtract(1, "month");
  const history = useHistory();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const [thisMonth, setThisMonth] = useState<Moment>(moment());
  const [addTransactionModaOpen, setAddTransactionModalOpen] = useState(false);
  const classes = useStyles();

  const targetDate = `${thisMonth.year()}-${thisMonth.month() + 1}`;

  const [monthlyTransactions, isMonthlyTransactionsLoading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
          .collection("transactions")
          .orderBy("timestamp", "desc")
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

  const [lastMonthSummary] = useDocumentData<Summary>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(`${lastMonth.year()}-${lastMonth.month() + 1}`)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">
            <strong>Overview -</strong>{" "}
            <span style={{ fontWeight: 300 }}>
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
        <div className={classes.leftContainer}>
          <div>
            <div className={classes.summaryContainer}>
              <SummaryCard
                title="Income"
                amount={(summary && summary.income) || 0}
                lastMonth={(lastMonthSummary && lastMonthSummary.income) || 0}
              />
              <SummaryCard
                title="Expenses"
                amount={(summary && summary.expenses) || 0}
                lastMonth={(lastMonthSummary && lastMonthSummary.expenses) || 0}
                inverted
              />
            </div>
          </div>
          <div style={{ marginTop: "0.75rem", minWidth: 280 }}>
            <MonthSummaryContainer
              currentMonth={thisMonth}
              transactions={monthlyTransactions}
              isLoading={isMonthlyTransactionsLoading}
            />
          </div>
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="body1">
            Recent Transactions - This Month
          </Typography>
          <MonthTransactionsContainer
            month={thisMonth}
            shouldDisplayAddTransactionModal={true}
            onAddTransactionModalClose={() => setAddTransactionModalOpen(false)}
            isAddTransactionModalOpen={addTransactionModaOpen}
            maxTransactions={5}
          />
          <div className={classes.actionButtonContainer}>
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
        </div>
      </div>
      <Fab
        variant="extended"
        className={classes.fab}
        color="primary"
        onClick={() => setAddTransactionModalOpen(true)}
      >
        <AddIcon className={classes.extendedIcon} />
        Add Transaction
      </Fab>
    </div>
  );
};

export default DashboardPage;
