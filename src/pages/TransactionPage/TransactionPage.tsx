import React, { FC, useContext } from "react";
import firebase from "firebase";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { Transaction } from "../../types/Transaction";

import useStyles from "./styles";
import LoadingContainer from "../../containers/LoadingContainer";
import { Typography } from "@material-ui/core";

const TransactionPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const history = useHistory();
  let { monthId, transactionId } = useParams();

  const classes = useStyles();

  const [transaction, loading, error] = useDocumentData<Transaction>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(monthId)
          .collection("transactions")
          .doc(transactionId)
      : null
  );

  const onDeleteTransaction = async () => {
    if (user) {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(monthId)
        .collection("transactions")
        .doc(transactionId)
        .delete();
      history.push("/dashboard");
    }
  };

  if (!user || !user.uid) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <div className={classes.root}>
        <LoadingContainer loadingMessage="Fetching Transaction Data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" color="textPrimary">
          An Error Occured.
        </Typography>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" color="textPrimary">
          Cannot Find Transaction
        </Typography>
        <Button variant="outlined" color="primary" href="/dashboard">
          Go Back Home
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          onDeleteTransaction();
        }}
      >
        Delete Transaction
      </Button>
    </div>
  );
};

export default TransactionPage;
