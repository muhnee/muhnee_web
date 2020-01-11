import React, { FC, useContext, useState } from "react";
import firebase from "firebase";

import { useCollectionData } from "react-firebase-hooks/firestore";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Skeleton from "@material-ui/lab/Skeleton";

import MaterialPieChart from "../../components/charts/MaterialPieChart";

import EmptyStateContainer from "../EmptyStateContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import CategoriesContext from "../../contexts/CategoriesContext";

import { MonthlySpendingByCategoryContainerProps } from "./types";
import { Transaction } from "../../types/Transaction";

const MonthlySpendingByCategoryContainer: FC<MonthlySpendingByCategoryContainerProps> = ({
  date
}) => {
  const [activeIndex, setActiveIndex] = useState<Number | null>(null);
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

  const onMouseOver = (data: object, index: number) => {
    setActiveIndex(index);
  };

  const onMouseLeave = (data: object, index: number) => {
    setActiveIndex(null);
  };

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

  const summary = Object.keys(spendByCategory).map(categoryId => {
    return {
      category: categoryMap.expense[categoryId],
      amount: spendByCategory[categoryId]
    };
  });

  if (!summary || summary.length <= 0) {
    return (
      <EmptyStateContainer
        title="No transactions found"
        caption="Add a transaction to get started"
      />
    );
  }

  return (
    <>
      <MaterialPieChart
        data={summary}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseLeave}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          {summary && (
            <TableBody>
              {summary.map((data, i) => {
                const fontColor =
                  activeIndex === null
                    ? "#000"
                    : activeIndex === i
                    ? "#000"
                    : "#ccc";
                return (
                  <TableRow key={i}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: fontColor
                      }}
                    >
                      {data.category && data.category.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: fontColor
                      }}
                    >{`$${data.amount.toFixed(2)}`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default MonthlySpendingByCategoryContainer;
