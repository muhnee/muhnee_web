import React, { FC } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import { useFunctions } from "../../../firebase/firebase";

import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import DeleteUpcomingTransactionDialogProps from "./types";

const DeleteUpcomingTransactionDialog: FC<DeleteUpcomingTransactionDialogProps> = ({
  id,
  open = false,
  onClose = () => {}
}) => {
  const functions = useFunctions();
  const dispatchNotifications = useNotificationDispatch();

  const deleteTransaction = () => {
    const deleteUserScheduledTransactions = functions.httpsCallable(
      "deleteUserScheduledTransactions"
    );
    deleteUserScheduledTransactions({ scheduledTransactionId: id })
      .then(() => {
        dispatchNotifications({
          notification: {
            type: "success",
            message: 'Successfully removed scheduled transaction!"'
          },
          type: "@@NOTIFICATION/PUSH"
        });
        onClose();
      })
      .catch(err =>
        dispatchNotifications({
          notification: {
            type: "error",
            title: err
          },
          type: "@@NOTIFICATION/PUSH"
        })
      );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete this?</DialogTitle>
      <DialogContent>
        <Typography>This will remove your scheduled transaction.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => deleteTransaction}>OK, Continue.</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUpcomingTransactionDialog;
