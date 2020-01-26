import React, { FC, useState, useEffect } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Skeleton from "@material-ui/lab/Skeleton";

import MaterialPieChart from "../../components/charts/MaterialPieChart";

import EmptyStateContainer from "../EmptyStateContainer";

import { MonthlySpendingByCategoryContainerProps } from "./types";
import { Category } from "../../types/Category";
import { useFunctions } from "../../firebase/firebase";

const MonthlySpendingByCategoryContainer: FC<MonthlySpendingByCategoryContainerProps> = ({
  date
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const targetDate = `${date.year()}-${date.month() + 1}`;
  const functions = useFunctions();

  const [summary, setSummary] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function getData() {
      if (!didCancel) {
        setIsLoading(true);
        const getCurrentSummaryforTransactions = functions.httpsCallable(
          "getCurrentSummaryforTransactions"
        );
        const res = await getCurrentSummaryforTransactions({
          date: date.toISOString(),
          transactionType: "expense",
          summaryType: "month"
        });
        const resData = res.data;
        const data = Object.keys(resData).map(key => {
          const data = resData[key];
          const category: Category = {
            id: key,
            amount: data.amount,
            name: data.name,
            icon: data.icon
          };
          return category;
        });
        setSummary(data);
        setIsLoading(false);
      }
    }
    getData();
    return () => {
      didCancel = false;
    };
  }, [functions, date]);

  const onMouseOver = (data: object, index: number) => {
    setActiveIndex(index);
  };

  const onMouseLeave = (data: object, index: number) => {
    setActiveIndex(null);
  };

  const onTableSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.checked) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  if (isLoading) {
    return <Skeleton variant="rect" width={"100%"} height={"100%"} />;
  }

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
        activeIndex={activeIndex}
        data={summary}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseLeave}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={i === activeIndex}
                        onChange={event => onTableSelect(event, i)}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: fontColor
                      }}
                    >
                      {data && data.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: fontColor
                      }}
                    >
                      {data.amount ? `$${data.amount.toFixed(2)}` : "N/A"}
                    </TableCell>
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
