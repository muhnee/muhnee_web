import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import Typography from "@material-ui/core/Typography";

import SignInWithGoogleButton from "../../components/buttons/SignInWithGoogleButton";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { doSignInWithGoogle } from "../../firebase/auth";

import useStyles from "./styles";

const LandingPage: FC = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const classes = useStyles();

  // if the user is logged in then redirect to dashboard
  if (isLoaded && user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <div className={classes.loginContainer}>
          <Typography variant="h5">Welcome to Muhnee</Typography>
          <Typography variant="body1" color="textSecondary">
            A simple way to manage your money.
          </Typography>

          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <SignInWithGoogleButton onClick={() => doSignInWithGoogle()} />
          </div>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <img src="/images/finance.svg" style={{ maxWidth: 300 }} alt="budget" />
      </div>
    </div>
  );
};

export default LandingPage;
