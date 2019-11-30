import React, { FC } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import DeleteTransactionWarningDialogProps from "./types";

const DeleteTransactionWarningDialog: FC<DeleteTransactionWarningDialogProps> = ({
  onDeleteTransaction,
  onClose,
  open
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={onDeleteTransaction} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTransactionWarningDialog;
