import React, { FC, useContext } from "react";
import firebase from "firebase";
import moment from "moment";

import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { getGreeting } from "../../utils/greeting";

import useStyles from "./styles";

import { Transaction } from "../../types/Transaction";
import { Summary } from "../../types/Summary";

import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  CircularProgress
} from "@material-ui/core";

import ExpenseIcon from "@material-ui/icons/CreditCard";
import IncomeIcon from "@material-ui/icons/TrendingUp";

const DashboardPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const classes = useStyles();

  const today = moment();
  const thisMonth = `${today.year()}-${today.month()}`;
  const [monthlyTransactions, loading, error] = useCollectionData<Transaction>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(thisMonth)
          .collection("transactions")
      : null
  );

  const [summary] = useDocumentData<Summary>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(thisMonth)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <div>
          <Typography variant="h6">{`Good ${getGreeting(moment())}, ${
            user.displayName
          }`}</Typography>
          <Typography variant="h5" className={classes.heading}>
            {today.format("MMMM YYYY")}
          </Typography>
        </div>
        {summary && (
          <div>
            <div>
              <Typography variant="h5" className={classes.heading}>
                {summary.expenses}
              </Typography>
              <Typography variant="h6" className={classes.heading}>
                Expenses
              </Typography>
            </div>
            <div>
              <Typography variant="h5" className={classes.heading}>
                {`$${summary.income}`}
              </Typography>
              <Typography variant="h6" className={classes.heading}>
                income
              </Typography>
            </div>
          </div>
        )}
        <div>Charts and Diagrams here.</div>
      </div>
      <div className={classes.rightContainer}>
        <Typography variant="body1">Recent Transactions</Typography>
        {loading && <CircularProgress />}
        {error && <span>An Error Occurred</span>}
        {monthlyTransactions && (
          <List>
            {monthlyTransactions.map((trans: Transaction, i) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {trans.type === "expense" && <ExpenseIcon />}
                    {trans.type === "income" && <IncomeIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={trans.description} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
