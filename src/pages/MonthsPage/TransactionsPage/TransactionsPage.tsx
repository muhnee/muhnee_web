import React, { FC, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import moment, { Moment } from "moment";

import { useCollection } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../../contexts/AuthenticationContext";

import useStyles from "./styles";
import LoadingContainer from "../../../containers/LoadingContainer";
import { List } from "@material-ui/core";
import TransactionCard from "../../../components/cards/TransactionCard";

/**
 * This page lists all the transactions for the month
 */
const TransactionsPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();

  // Contexts
  const { user } = useContext(AuthenticationContext);

  const date: Moment = moment(monthId, "YYYY-MM");

  const [
    monthlyTransactions,
    isMonthlyTransactionsLoading,
    error
  ] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(monthId)
          .collection("transactions")
          .orderBy("timestamp", "desc")
      : null
  );

  const classes = useStyles();

  if (!monthId) {
    return <div className={classes.root}>Not Found</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Typography variant="h6">{`Transactions for ${date.format(
            "MMMM YYYY"
          )}`}</Typography>
        </div>
        <div className={classes.monthlySummaryContainer}>
          <div className={classes.monthlySummaryCard}>Monthly income</div>
          <div className={classes.monthlySummaryCard}>Monthly expenses</div>
          <div className={classes.monthlySummaryCard}>
            Monthly total savings
          </div>
          <div className={classes.monthlySummaryCard}>Monthly goal</div>
        </div>
      </div>
      <div className={classes.main}>
        <Typography variant="h6" color="textSecondary">
          Transactions this month
        </Typography>
        {isMonthlyTransactionsLoading ? (
          <LoadingContainer
            loadingMessage="Loading Transactions..."
            subtitle="Getting your transactions for this month"
          />
        ) : error ? (
          <div>An Error has occured</div>
        ) : monthlyTransactions && monthlyTransactions.size > 0 && monthId ? (
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
                  month={monthId}
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
      </div>
    </div>
  );
};

export default TransactionsPage;
