import React, { FC } from "react";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import MoneyTypography from "../../core/MoneyTypography";
import TransactionsListItem from "../../TransactionsListItem";
import MaterialLineChart from "../../charts/MaterialLineChart";

import Skeleton from "@material-ui/lab/Skeleton";

import SummaryCardProps from "./types";

import useStyles from "./styles";

const SummaryCard: FC<SummaryCardProps> = props => {
  const {
    title,
    amount,
    transactions,
    isLoading = false,
    displayProgress = false,
    progress = 0,
    transactionsTitle = "Latest Transactions",
    showGraph = false,
    type = "expense"
  } = props;
  const classes = useStyles(props);

  let dateSummary: {
    [id: string]: number;
  } = {};

  if (transactions) {
    transactions.forEach(transaction => {
      console.log(transaction.timestamp);
      const date = moment(transaction.timestamp);
      if (dateSummary[date.format("YYYY-MM-DD")]) {
        dateSummary[date.format("YYYY-MM-DD")] += transaction.amount;
      } else {
        dateSummary[date.format("YYYY-MM-DD")] = transaction.amount;
      }
    });
  }
  const graphData = Object.keys(dateSummary)
    .map(key => {
      const summary = dateSummary[key];
      return {
        date: key,
        amount: summary
      };
    })
    .sort((a, b) => {
      return moment(a.date).isBefore(moment(b.date)) ? -1 : 1;
    });

  return (
    <Card className={classes.root} variant="outlined">
      {displayProgress && (
        <LinearProgress variant="determinate" value={progress} />
      )}
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton variant="rect" width={100} height={"1rem"} />
            <Skeleton
              variant="rect"
              width={100}
              height={"1.5rem"}
              style={{ marginTop: "0.5rem" }}
            />
          </>
        ) : (
          <>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            {typeof amount === "string" ? (
              <MoneyTypography variant="h5" type={type}>
                {amount}
              </MoneyTypography>
            ) : (
              amount
            )}
          </>
        )}
      </CardContent>
      {showGraph && (
        <CardContent>
          <MaterialLineChart data={graphData} />
        </CardContent>
      )}

      {transactions && (
        <>
          <Divider />
          <CardContent>
            <Typography>{transactionsTitle}</Typography>
            {isLoading ? (
              <Skeleton variant="rect" width="100%" height={"5rem"} />
            ) : (
              <List>
                {transactions.map((transaction, i) => {
                  return (
                    <TransactionsListItem transaction={transaction} key={i} />
                  );
                })}
              </List>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default SummaryCard;
