import React, { FC } from "react";

import ExpenseIcon from "@material-ui/icons/CreditCard";
import IncomeIcon from "@material-ui/icons/TrendingUp";

import useStyles from "./styles";

import TransactionCardProps from "./types";
import { Avatar, Typography } from "@material-ui/core";
import moment from "moment";

const TransactionCard: FC<TransactionCardProps> = props => {
  const { transaction, key } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root} key={key}>
      <div>
        <Avatar className={classes.avatar}>
          {transaction.type === "expense" ? <ExpenseIcon /> : <IncomeIcon />}
        </Avatar>
      </div>
      <div className={classes.cardCenter}>
        <Typography variant="body2">{transaction.type}</Typography>
        <Typography variant="body1">{transaction.description}</Typography>
      </div>
      <div>
        {transaction.amount && (
          <Typography component="strong">{`$${transaction.amount.toFixed(
            2
          )}`}</Typography>
        )}
        <Typography>
          {transaction.timestamp &&
            moment(transaction.timestamp.toDate()).format("Do MMM")}
        </Typography>
      </div>
    </div>
  );
};
export default TransactionCard;
