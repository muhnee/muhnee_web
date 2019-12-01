import React, { FC } from "react";
import moment from "moment";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import IncomeIcon from "@material-ui/icons/TrendingUp";
import ExpenseIcon from "@material-ui/icons/CreditCard";

import useStyles from "./styles";

import TransactionCardProps from "./types";
import { ButtonBase } from "@material-ui/core";

const TransactionCard: FC<TransactionCardProps> = props => {
  const { transaction, key, month, transactionId } = props;

  const classes = useStyles(props);

  const link = `/months/${month}/transactions/${transactionId}`;

  return (
    <ButtonBase className={classes.root} key={key} href={link}>
      <div>
        <Avatar className={classes.avatar}>
          {transaction.type === "expense" ? <ExpenseIcon /> : <IncomeIcon />}
        </Avatar>
      </div>
      <div className={classes.cardCenter}>
        <Typography variant="body2">{transaction.type}</Typography>
        <Typography variant="body1">
          {transaction.description || "(no description)"}
        </Typography>
      </div>
      <div className={classes.cardRight}>
        {transaction.amount && (
          <Typography variant="body1">{`$${transaction.amount.toFixed(
            2
          )}`}</Typography>
        )}
        <Typography variant="body2">
          {transaction.timestamp
            ? moment(transaction.timestamp.toDate()).format("Do MMM")
            : "N/A"}
        </Typography>
      </div>
    </ButtonBase>
  );
};
export default TransactionCard;
