import React, { FC, useContext } from "react";
import firebase from "firebase";

import { useCollectionData } from "react-firebase-hooks/firestore";

import List from "@material-ui/core/List";
import Skeleton from "@material-ui/lab/Skeleton";

import CategoriesListItem from "../../components/CategoriesListItem";

import EmptyStateContainer from "../EmptyStateContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import CategoriesContext from "../../contexts/CategoriesContext";

import { MonthlySpendingByCategoryContainerProps } from "./types";
import { Transaction } from "../../types/Transaction";
import { CategorySpend } from "../../types/Category";

const MonthlySpendingByCategoryContainer: FC<MonthlySpendingByCategoryContainerProps> = ({
  date
}) => {
  const { user } = useContext(AuthenticationContext);
  const { categoryMap } = useContext(CategoriesContext);
  const targetDate = `${date.year()}-${date.month() + 1}`;

  const [
    monthlyTransactions,
    isMonthlyTransactionsLoading,
    error
  ] = useCollectionData<Transaction>(
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

  if (isMonthlyTransactionsLoading || !categoryMap.expense) {
    return <Skeleton variant="rect" width={"100%"} height={"100%"} />;
  }

  if (error) {
    return (
      <EmptyStateContainer
        title="Something went wrong!"
        caption="Please refresh and try again later"
      />
    );
  }

  if (!monthlyTransactions) {
    return (
      <EmptyStateContainer
        title="No transactions this month"
        caption="Create a transaction to get started!"
      />
    );
  }

  let spendByCategory: { [id: string]: number } = {};
  monthlyTransactions.forEach(data => {
    if (data.type === "expense") {
      if (spendByCategory[data.category]) {
        spendByCategory[data.category] += data.amount || 0;
      } else {
        spendByCategory[data.category] = data.amount || 0;
      }
    }
  });

  const summary: CategorySpend[] = Object.keys(spendByCategory).map(
    categoryId => {
      if (categoryMap.expense[categoryId]) {
        return {
          category: categoryMap.expense[categoryId],
          amount: spendByCategory[categoryId]
        };
      }
      return null;
    }
  );

  return summary.length > 0 ? (
    <List>
      {summary.map((category, i) => {
        if (category) {
          return (
            <CategoriesListItem
              category={category.category}
              secondaryTitle={`$${category.amount.toFixed(2)}`}
              type="expense"
              key={i}
              editable={false}
            />
          );
        }
        return null;
      })}
    </List>
  ) : (
    <span>No transactions found</span>
  );
};

export default MonthlySpendingByCategoryContainer;
