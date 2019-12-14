import React, { FC, useContext, useState, useEffect } from "react";
import moment from "moment";
import firebase from "firebase";

import { doSignOut } from "../../firebase/firebase";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { UserContext } from "../../contexts/UserContext";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import useStyles from "./styles";

const AccountPage: FC = () => {
  const { user, isLoaded } = useContext(AuthenticationContext);
  const { onboarded } = useContext(UserContext);
  const dispatchNotifications = useNotificationDispatch();

  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      if (user && user.uid) {
        const userDoc = await firebase
          .firestore()
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
  }, [user, setMonthlySavingsGoal]);

  const updateSavingsGoal = async () => {
    if (user && user.uid) {
      await firebase
        .firestore()
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

  if (!isLoaded) {
    return <LoadingContainer loadingMessage="Fetching your details..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        {user.photoURL && (
          <Avatar src={user.photoURL} className={classes.avatar} />
        )}
        {user.displayName && (
          <Typography variant="h6">{user.displayName}</Typography>
        )}
        <Typography variant="body1" color="textSecondary">
          {`Saving Money Since ${moment(user.metadata.creationTime).format(
            "Do MMM YYYY"
          )}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {onboarded ? "User Onboarded" : "User not onboarded"}
        </Typography>
      </div>
      <Divider />
      <div className={classes.container}>
        <Typography variant="h6" color="textPrimary">
          Account Settings
        </Typography>
      </div>
      <Divider />
      <div className={classes.container}>
        <Typography variant="h6" color="textPrimary">
          Budget Tool Settings
        </Typography>
        <div className={classes.row}>
          <div>
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
              fullWidth
            />
          </div>
        </div>
      </div>

      <Button onClick={() => doSignOut()}>Logout</Button>
    </div>
  );
};

export default AccountPage;
