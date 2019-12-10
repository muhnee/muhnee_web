import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import moment, { Moment } from "moment";

import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import SummaryCard from "../../components/dashboard/SummaryCard";
import AddTransactionModal from "../../components/dialogs/AddTransactionModal";
import TransactionCard from "../../components/cards/TransactionCard";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Summary } from "../../types/Summary";

import useStyles from "./styles";

const DashboardPage: FC = () => {
  const lastMonth = moment().subtract(1, "month");
  const history = useHistory();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const [thisMonth, setThisMonth] = useState<Moment>(moment());
  const classes = useStyles();

  const targetDate = `${thisMonth.year()}-${thisMonth.month()}`;

  const [monthlyTransactions, loading, error] = useCollection(
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
          .doc(`${lastMonth.year()}-${lastMonth.month()}`)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div style={{ flex: 1 }}>
          <Typography variant="h6">{`Overview - ${thisMonth.format(
            "MMMM YYYY"
          )}`}</Typography>
        </div>
        <ButtonGroup color="primary" aria-label=" outlined button group">
          <Button
            variant={
              targetDate === `${moment().year()}-${moment().month()}`
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
                .month()}`
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
            <div className={classes.summaryButtonContainer}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/months")}
              >
                View Month Summary
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="body1">
            Recent Transactions - This Month
          </Typography>
          {loading && <CircularProgress />}
          {error && <span>An Error Occurred</span>}
          {monthlyTransactions && monthlyTransactions.size > 0 ? (
            <List>
              {monthlyTransactions.docs
                .slice(0, 6)
                .map((monthlyTransactionsSnapshot, i) => {
                  let monthlyTransaction: any = monthlyTransactionsSnapshot.data();
                  return (
                    <TransactionCard
                      key={`${monthlyTransactionsSnapshot.id}`}
                      transaction={{
                        amount: monthlyTransaction.amount,
                        type: monthlyTransaction.type,
                        category: monthlyTransaction.category,
                        description: monthlyTransaction.description,
                        taxDeductible: monthlyTransaction.taxDeductible,
                        timestamp: monthlyTransaction.timestamp
                      }}
                      transactionId={monthlyTransactionsSnapshot.id}
                      month={targetDate}
                    />
                  );
                })}
            </List>
          ) : (
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              <Typography variant="body1" color="textPrimary">
                No transactions in this month
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create a transaction to get started
              </Typography>
            </div>
          )}
          {!loading && (
            <div style={{ marginTop: "0.25rem" }}>
              <AddTransactionModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
