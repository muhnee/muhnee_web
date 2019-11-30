import React, { FC } from "react";
import moment from "moment";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import IncomeIcon from "@material-ui/icons/TrendingUp";
import InfoIcon from "@material-ui/icons/Info";
import ExpenseIcon from "@material-ui/icons/CreditCard";

import useStyles from "./styles";

import TransactionCardProps from "./types";

const TransactionCard: FC<TransactionCardProps> = props => {
  const { transaction, key, month, transactionId } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root} key={key}>
      <div>
        <IconButton href={`/months/${month}/transactions/${transactionId}`}>
          <InfoIcon />
        </IconButton>
      </div>
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
          {transaction.timestamp &&
            moment(transaction.timestamp.toDate()).format("Do MMM")}
        </Typography>
      </div>
    </div>
  );
};
export default TransactionCard;