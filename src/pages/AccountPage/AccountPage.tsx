import React, { FC, useContext, useState, useEffect } from "react";
import moment from "moment";

import { useFirestore } from "../../firebase/firebase";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import useStyles from "./styles";

const AccountPage: FC = () => {
  const { user, isLoaded } = useContext(AuthenticationContext);
  const dispatchNotifications = useNotificationDispatch();
  const firestore = useFirestore();

  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState(0);

  const classes = useStyles();

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

  if (!isLoaded) {
    return <LoadingContainer loadingMessage="Fetching your details..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent className={classes.headerContainer}>
          {user.photoURL && (
            <Avatar src={user.photoURL} className={classes.avatar} />
          )}
          <div style={{ flex: 1, marginLeft: "0.75rem" }}>
            {user.displayName && (
              <Typography variant="h6">{user.displayName}</Typography>
            )}
            {user.email && (
              <Typography variant="body1" gutterBottom>
                {user.email}
              </Typography>
            )}
            <Typography variant="body1" color="textSecondary">
              {`Saving Money Since ${moment(user.metadata.creationTime).format(
                "Do MMM YYYY"
              )}`}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <div></div>
      <Divider />
      <div className={classes.container}>
        <Card variant="outlined" className={classes.settingsCard}>
          <CardHeader
            title="Budget Tool Settings"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
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
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              fullWidth
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
