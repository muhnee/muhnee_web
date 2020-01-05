import React, { FC, useContext } from "react";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import List from "@material-ui/core/List";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { MonthTransactionsContainerProps } from "./types";
import LoadingContainer from "../LoadingContainer";
import TransactionCard from "../../components/cards/TransactionCard";
import EmptyStateContainer from "../EmptyStateContainer";

const MonthTransactionsContainer: FC<MonthTransactionsContainerProps> = props => {
  const { month, maxTransactions = null } = props;
  const { user } = useContext(AuthenticationContext);
  const targetDate = `${month.year()}-${month.month() + 1}`;

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
          .doc(targetDate)
          .collection("transactions")
          .orderBy("timestamp", "desc")
      : null
  );

  if (!user) {
    return null;
  }

  if (isMonthlyTransactionsLoading) {
    return <LoadingContainer loadingMessage="Fetching your transactions..." />;
  }

  if (error) {
    return (
      <EmptyStateContainer
        title="Something went wrong!"
        caption="Please refresh and try again later"
      />
    );
  }

  return (
    <div>
      {!monthlyTransactions || monthlyTransactions.size === 0 ? (
        <EmptyStateContainer
          title="No transactions this month"
          caption="Create a transaction to get started!"
        />
      ) : (
        <List>
          {monthlyTransactions.docs
            .slice(0, maxTransactions || monthlyTransactions.size)
            .map((monthlyTransactionsSnapshot, i) => {
              let monthlyTransaction: any = monthlyTransactionsSnapshot.data();
              return (
                <TransactionCard
                  key={i}
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
      )}
    </div>
  );
};

export default MonthTransactionsContainer;
