import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import moment from "moment";

import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import SummaryCard from "../../components/dashboard/SummaryCard";
import AddTransactionModal from "../../components/dialogs/AddTransactionModal";
import TransactionCard from "../../components/cards/TransactionCard";

import ExpenseIcon from "@material-ui/icons/CreditCard";
import IncomeIcon from "@material-ui/icons/TrendingUp";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Summary } from "../../types/Summary";

import useStyles from "./styles";

const DashboardPage: FC = () => {
  const today = moment();
  const history = useHistory();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const [thisMonth] = useState(`${today.year()}-${today.month()}`);
  const classes = useStyles();

  const [monthlyTransactions, loading, error] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(thisMonth)
          .collection("transactions")
          .orderBy("timestamp", "desc")
          .limit(10)
      : null
  );

  const [summary] = useDocumentData<Summary>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(thisMonth)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }
  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <div style={{ marginBottom: "1.25rem" }}>
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            Welcome to
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 300 }}>
            Muhnee
          </Typography>
        </div>
        <Typography variant="h6" color="primary">
          {`This Month (${today.format("MMMM YYYY")})`}
        </Typography>
        <div>
          <div className={classes.summaryContainer}>
            <SummaryCard
              title="Expenses"
              amount={
                summary && summary.expenses
                  ? `$${summary.expenses.toFixed(2)}`
                  : "N/A"
              }
              avatar={<ExpenseIcon />}
              inverted
            />
            <SummaryCard
              title="Income"
              avatar={<IncomeIcon />}
              amount={
                summary && summary.income
                  ? `$${summary.income.toFixed(2)}`
                  : "N/A"
              }
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
        <Typography variant="body1">Recent Transactions</Typography>
        {monthlyTransactions && monthlyTransactions.size > 0 && (
          <AddTransactionModal />
        )}
        {loading && <CircularProgress />}
        {error && <span>An Error Occurred</span>}
        {monthlyTransactions && monthlyTransactions.size > 0 ? (
          <List>
            {monthlyTransactions.docs.map((monthlyTransactionsSnapshot, i) => {
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
                  month={thisMonth}
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
            <div style={{ marginTop: "0.25rem" }}>
              <AddTransactionModal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
