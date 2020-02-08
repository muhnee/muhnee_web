import React, { FC, useContext } from "react";
import { useTransition, animated } from "react-spring";
import { Redirect } from "react-router";
import moment from "moment";

import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import useStyles from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  doSignInWithGoogle,
  doSignInWithFacebook,
  doSignInWithApple
} from "../../firebase/firebase";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import { UserContext } from "../../contexts/UserContext";

const LoginContainer: FC = () => {
  const dispatch = useNotificationDispatch();
  const classes = useStyles();

  return (
    <Paper className={classes.loginContainer}>
      <div style={{ margin: "0.5rem 0 1.25rem 0" }}>
        <div>
          <img src="/images/Muhnee.png" width={50} />
          <Typography variant="h5">Muhnee</Typography>
        </div>
        <Typography variant="body1" color="textSecondary">
          Personal Finance, Simplified.
        </Typography>
      </div>
      <Divider />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1.25rem"
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 700 }}>
          Welcome Back
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Sign in to Continue
        </Typography>
      </div>

      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          src="/images/auth/signin_with_google.png"
          className={classes.loginImage}
          width={200}
          onClick={() =>
            doSignInWithGoogle().catch(err => {
              dispatch({
                type: "@@NOTIFICATION/PUSH",
                notification: {
                  type: "error",
                  message: err.message
                }
              });
            })
          }
        />
        <img
          src="/images/auth/facebook.png"
          className={classes.loginImage}
          width={200}
          onClick={() =>
            doSignInWithFacebook().catch(err => {
              dispatch({
                type: "@@NOTIFICATION/PUSH",
                notification: {
                  type: "error",
                  message: err.message
                }
              });
            })
          }
        />
        <img
          src="/images/auth/appleid_button.png"
          className={classes.loginImage}
          onClick={() =>
            doSignInWithApple().catch(err => {
              dispatch({
                type: "@@NOTIFICATION/PUSH",
                notification: {
                  type: "error",
                  message: err.message
                }
              });
            })
          }
        />
      </div>
      <Divider />

      <div style={{ marginTop: "0.5rem" }}>
        <Typography variant="caption">
          By signing in you are accepting our{" "}
          <Link
            href="https://www.notion.so/Privacy-13ae75755f0e49c28a1a19a607931665"
            target="_blank"
          >
            Privacy Policy
          </Link>{" "}
          and our{" "}
          <Link
            href="https://www.notion.so/muhnee/Terms-of-Use-a10d1dd98f044d1b9799f39fca4e387a"
            target="_blank"
          >
            Terms of Use
          </Link>{" "}
          policies.
        </Typography>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Typography variant="caption">
          Copyright &copy; Muhnee {moment().year()}
        </Typography>
      </div>
    </Paper>
  );
};
const LandingPage: FC = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const { onboarded, loaded } = useContext(UserContext);

  const transitions = useTransition(true, null, {
    from: { transform: "translate3d(0,-50%,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-50%,0)" }
  });

  const classes = useStyles();

  if (!isLoaded) {
    return <LoadingContainer />;
  }

  if (isLoaded && user && loaded && !onboarded) {
    return <Redirect to="/start" />;
  }

  // if the user is logged in then redirect to dashboard
  if (loaded && onboarded && isLoaded && user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        {transitions.map(e => {
          const { item, key, props } = e;
          return (
            <animated.div style={props}>
              <LoginContainer />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
