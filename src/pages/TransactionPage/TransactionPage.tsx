import React, { FC, useContext, useState } from "react";
import firebase from "firebase";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { Transaction } from "../../types/Transaction";

import useStyles from "./styles";

const TransactionPage: FC = () => {
  const { user } = useContext(AuthenticationContext);

  const [warningDialogOpen, setWarningDialogOpen] = useState(false);

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
          setWarningDialogOpen(true);
        }}
      >
        Delete Transaction
      </Button>
      <Dialog
        open={warningDialogOpen}
        onClose={() => setWarningDialogOpen(false)}
      >
        <DialogTitle>
          {"Are you sure you want to delete this transaction?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this transaction is not recoverable, you will need to readd
            this record, if you hav deleted this transaction
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setWarningDialogOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDeleteTransaction();
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionPage;
