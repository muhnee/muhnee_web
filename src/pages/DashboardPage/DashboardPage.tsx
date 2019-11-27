import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";

import Typography from "@material-ui/core/Typography";

import AuthenticatedContainer from "../../containers/AuthenticatedContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { getGreeting } from "../../utils/greeting";

import useStyles from "./styles";

const DashboardPage: FC = () => {
  const { user, isLoaded, refreshToken, isTokenLoaded } = useContext(
    AuthenticationContext
  );
  const classes = useStyles();
  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }
  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <div>
          <Typography variant="h6">{`Good ${getGreeting(moment())}, ${
            user.displayName
          }`}</Typography>
          <Typography variant="body1" color="textSecondary">
            You are broke
          </Typography>
        </div>
        <div>Charts and Diagrams here.</div>
      </div>
      <div className={classes.rightContainer}>
        <Typography variant="body1" color="textPrimary">
          Recent Transactions
        </Typography>
      </div>
    </div>
  );
};

export default DashboardPage;
