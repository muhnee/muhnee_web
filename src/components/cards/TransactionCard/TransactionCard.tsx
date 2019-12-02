import React, { FC, useContext } from "react";
import moment from "moment";
import firebase from "firebase";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import IncomeIcon from "@material-ui/icons/TrendingUp";
import ExpenseIcon from "@material-ui/icons/CreditCard";

import AuthenticationContext from "../../../contexts/AuthenticationContext";

import useStyles from "./styles";

import TransactionCardProps from "./types";

const TransactionCard: FC<TransactionCardProps> = props => {
  const { user } = useContext(AuthenticationContext);
  const { transaction, key, month, transactionId } = props;

  const classes = useStyles(props);

  const [transactionCategory] = useDocumentData<{ name: string }>(
    user && transaction.category
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("categories")
          .doc(transaction.type)
          .collection("types")
          .doc(transaction.category)
      : null
  );

  const link = `/months/${month}/transactions/${transactionId}`;

  return (
    <ButtonBase className={classes.root} key={key} href={link}>
      <div>
        <Avatar className={classes.avatar}>
          {transaction.type === "expense" ? <ExpenseIcon /> : <IncomeIcon />}
        </Avatar>
      </div>
      <div className={classes.cardCenter}>
        <Typography variant="body2">
          {transactionCategory ? transactionCategory.name : transaction.type}
        </Typography>
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
