import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import PolicyLinks from "../../components/PolicyLinks";
import SignInWithGoogleButton from "../../components/buttons/SignInWithGoogleButton";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import useStyles from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  doSignInWithGoogle,
  doSignInWithFacebook
} from "../../firebase/firebase";
import SignInWithFacebookButton from "../../components/buttons/SignInWithFacebookButton";

const LandingPage: FC = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
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
              margin: "1.25rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <SignInWithGoogleButton onClick={() => doSignInWithGoogle()} />
            <SignInWithFacebookButton onClick={() => doSignInWithFacebook()} />
          </div>
          <Divider />
          <PolicyLinks />
        </div>
      </div>
      {isDesktop && (
        <div className={classes.rightContainer}>
          <img
            src="/images/finance.svg"
            style={{ maxWidth: 300 }}
            alt="budget"
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
