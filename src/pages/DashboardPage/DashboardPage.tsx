import React, { FC, useContext } from "react";
import firebase from "firebase";
import moment from "moment";

import { useCollectionData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { getGreeting } from "../../utils/greeting";

import useStyles from "./styles";

import { Transaction } from "../../types/Transaction";

const DashboardPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const classes = useStyles();

  const today = moment();
  const thisMonth = `${today.year()}-${today.month()}`;
  const [values, loading, error] = useCollectionData<Transaction>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(thisMonth)
          .collection("expenses")
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
          <Typography variant="body1" color="textSecondary">
            You are broke
          </Typography>
        </div>
        <div>Charts and Diagrams here.</div>
      </div>
      <div className={classes.rightContainer}>
        <Typography variant="body1" color="textPrimary">
          Recent Transactions
        </Typography>
        {values &&
          values.map((trans, i) => <div key={i}>{JSON.stringify(trans)}</div>)}
      </div>
    </div>
  );
};

export default DashboardPage;
