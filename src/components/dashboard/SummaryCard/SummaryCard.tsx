import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import MoneyTypography from "../../core/MoneyTypography";
import MaterialLineChart from "../../charts/MaterialLineChart";

import Skeleton from "@material-ui/lab/Skeleton";

import SummaryCardProps from "./types";
import { Transaction } from "../../../types/Transaction";

import useStyles from "./styles";

const SummaryCard: FC<SummaryCardProps> = props => {
  const history = useHistory();
  const {
    title,
    amount,
    transactions,
    isLoading = false,
    displayProgress = false,
    progress = 0,
    transactionsTitle = "Latest Transactions",
    showGraph = false
  } = props;
  const classes = useStyles(props);

  const transactionsDocs: Transaction[] = transactions
    ? transactions.docs.map(doc => {
        const docData = doc.data();

        const transaction: Transaction = {
          type: docData.type,
          amount: docData.amount,
          description: docData.description,
          category: docData.category,
          taxDeductible: docData.taxDeductible,
          timestamp: docData.timestamp,
          id: doc.id
        };
        return transaction;
      })
    : [];

  let dateSummary: {
    [id: string]: number;
  } = {};

  if (transactionsDocs) {
    transactionsDocs.forEach(transaction => {
      const date = moment(transaction.timestamp.toDate());
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
              <MoneyTypography variant="h5">{amount}</MoneyTypography>
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
                {transactionsDocs.map((transaction, i) => {
                  const transcationTimestmap = moment(
                    transaction.timestamp.toDate()
                  );

                  return (
                    <ListItem
                      key={i}
                      className={classes.ListItem}
                      onClick={() =>
                        history.push(
                          `/months/${transcationTimestmap.year()}-${transcationTimestmap.month() +
                            1}/transactions/${transaction.id}`
                        )
                      }
                      button
                    >
                      <div style={{ flex: 1 }}>
                        <ListItemText
                          primary={transaction.description}
                          secondary={transcationTimestmap.format("Do MMM")}
                          secondaryTypographyProps={{
                            style: {
                              fontSize: "0.75rem"
                            }
                          }}
                        />
                      </div>
                      <Typography>{`$${transaction.amount.toFixed(
                        2
                      )}`}</Typography>
                    </ListItem>
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
