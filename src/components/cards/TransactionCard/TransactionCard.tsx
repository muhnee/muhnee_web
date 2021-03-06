import React, { FC, useContext } from "react";
import moment from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import IncomeIcon from "@material-ui/icons/TrendingUp";
import ExpenseIcon from "@material-ui/icons/CreditCard";

import AuthenticationContext from "../../../contexts/AuthenticationContext";

import useStyles from "./styles";

import TransactionCardProps from "./types";
import { Category } from "../../../types/Category";
import CategoryIconAvatar from "../../CategoryIconAvatar";

import { useFirestore } from "../../../firebase/firebase";

const TransactionCard: FC<TransactionCardProps> = props => {
  const { user } = useContext(AuthenticationContext);
  const { transaction, month, transactionId } = props;

  const firestore = useFirestore();

  const classes = useStyles(props);

  const [transactionCategory] = useDocumentData<Category>(
    user && transaction.category
      ? firestore
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
    <ButtonBase className={classes.root} href={link}>
      <div>
        {transactionCategory && transactionCategory.icon ? (
          <CategoryIconAvatar
            category={{ id: transaction.category, ...transactionCategory }}
            type={transaction.type}
          />
        ) : (
          <Avatar className={classes.avatar}>
            {transaction.type === "expense" ? <ExpenseIcon /> : <IncomeIcon />}
          </Avatar>
        )}
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
            ? moment(transaction.timestamp).format("Do MMM")
            : "N/A"}
        </Typography>
      </div>
    </ButtonBase>
  );
};
export default TransactionCard;
