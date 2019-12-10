import React, { FC, useContext } from "react";
import moment from "moment";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { UserContext } from "../../contexts/UserContext";

import useStyles from "./styles";
import { doSignOut } from "../../firebase/firebase";

const AccountPage: FC = () => {
  const { user, isLoaded } = useContext(AuthenticationContext);
  const { onboarded } = useContext(UserContext);

  const classes = useStyles();

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
            <TextField label="Savings Target" fullWidth />
          </div>
        </div>
      </div>
      <Button>Update Settings</Button>
      <Button onClick={() => doSignOut()}>Logout</Button>
    </div>
  );
};

export default AccountPage;
