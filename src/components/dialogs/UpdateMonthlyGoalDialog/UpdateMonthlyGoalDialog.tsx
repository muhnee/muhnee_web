import React, { FC, useContext, useEffect, useState } from "react";
import firebase from "firebase";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import { UpdateMonthlyGoalDialogProps } from "./types";

const UpdateMonthlyGoalDialog: FC<UpdateMonthlyGoalDialogProps> = ({
  open,
  onClose = () => {},
  date
}) => {
  const { user } = useContext(AuthenticationContext);
  const dispatchNotifications = useNotificationDispatch();

  const [monthlyGoal, setMonthlyGoal] = useState<Number>(0);

  useEffect(() => {
    async function getData() {
      if (user && user.uid) {
        const userMonthlyData = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(`${date.year()}-${date.month() + 1}`)
          .get();
        if (userMonthlyData.exists) {
          const userData: any = userMonthlyData.data();
          setMonthlyGoal(parseFloat(userData.savingsGoal || 0));
        }
      }
    }
    getData();
  }, [date, user, setMonthlyGoal]);

  const updateSavingsGoal = async () => {
    if (user && user.uid) {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(`${date.year()}-${date.month() + 1}`)
        .update({
          savingsGoal: monthlyGoal
        });
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: "Updated default savings goal for user",
          type: "success",
          title: "Successfully updated savings goal"
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{`Update Monthly Goal - ${date.format(
        "MMM YYYY"
      )}`}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ marginBottom: "0.25rem" }}>
          {`Note: this updates the goal for the month for ${date.format(
            "MMMM YYYY"
          )} and does not update the default goal for your account.`}
        </Typography>
        <TextField
          label="Savings Target"
          value={monthlyGoal}
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          onChange={event => {
            setMonthlyGoal(parseFloat(event.target.value));
          }}
          onKeyDown={event => {
            if (event.key === "Enter") {
              // then trigger save
              updateSavingsGoal();
            }
          }}
          onBlur={event => {
            updateSavingsGoal();
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMonthlyGoalDialog;
