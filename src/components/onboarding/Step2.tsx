import React, { FC, useEffect, useState } from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import { Step1Props } from "./types";

import useStyles from "./styles";
import { useFirestore } from "../../firebase/firebase";

const Step2: FC<Step1Props> = ({ user }) => {
  const dispatchNotifications = useNotificationDispatch();
  const firestore = useFirestore();

  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState(0);

  const updateSavingsGoal = async () => {
    if (user && user.uid) {
      await firestore
        .collection("users")
        .doc(user.uid)
        .update({
          monthlySavingsGoal: monthlySavingsGoal
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

  useEffect(() => {
    async function getData() {
      if (user && user.uid) {
        const userDoc = await firestore
          .collection("users")
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData: any = userDoc.data();
          setMonthlySavingsGoal(userData.monthlySavingsGoal || 0);
        }
      }
    }
    getData();
  }, [user, setMonthlySavingsGoal, firestore]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/images/goals.svg" className={classes.images} alt="goal" />
      <div className={classes.textContainer}>
        <Typography variant="h4">
          <strong>Firstly</strong>, let's setup a savings goal for you.
        </Typography>
        <Typography variant="body1">
          This will your default savings goal. Setting a goal allows you to help
          save towards a new target. You can always change this later
        </Typography>
      </div>
      <div className={classes.categories}>
        <TextField
          label="Savings Target"
          value={monthlySavingsGoal}
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          onChange={event => {
            setMonthlySavingsGoal(parseFloat(event.target.value));
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
      </div>
    </div>
  );
};

export default Step2;
