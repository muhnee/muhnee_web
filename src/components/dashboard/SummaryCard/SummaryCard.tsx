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

import MoneyTypography from "../../MoneyTypography";

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
    progress = 0
  } = props;
  const classes = useStyles(props);

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
      <Divider />
      {transactions && (
        <CardContent>
          <Typography>Latest Transactions</Typography>
          {isLoading ? (
            <Skeleton variant="rect" width="100%" height={"5rem"} />
          ) : (
            <List>
              {transactions.docs.map((doc, i) => {
                const docData = doc.data();

                const transaction: Transaction = {
                  type: docData.type,
                  amount: docData.amount,
                  description: docData.description,
                  category: docData.category,
                  taxDeductible: docData.taxDeductible,
                  timestamp: docData.timestamp
                };

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
                          1}/transactions/${doc.id}`
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
      )}
    </Card>
  );
};

export default SummaryCard;
