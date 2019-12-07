import React, { FC, useContext } from "react";
import moment from "moment";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import LoadingContainer from "../../containers/LoadingContainer";

import useStyles from "./styles";

const AccountPage: FC = () => {
  const { user, isLoaded } = useContext(AuthenticationContext);

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
          Account Settings
        </Typography>
      </div>
    </div>
  );
};

export default AccountPage;
