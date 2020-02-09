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
import GlobalConfigContext from "../../contexts/GlobalConfigContext";

import useStyles from "./styles";

import { doSignInWithGoogle, doSignInWithApple } from "../../firebase/firebase";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import { UserContext } from "../../contexts/UserContext";

const LoginContainer: FC = () => {
  const dispatch = useNotificationDispatch();
  const classes = useStyles();
  const globalConfigContext = useContext(GlobalConfigContext);

  return (
    <Paper className={classes.loginContainer}>
      <div className={classes.loginText}>
        <Typography variant="h5" style={{ fontWeight: 700 }}>
          Welcome to Muhnee
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Sign in to Continue
        </Typography>
      </div>

      <div className={classes.authProviders}>
        {globalConfigContext.enabledLogin.googleAuth && (
          <img
            src="/images/auth/signin_with_google.png"
            alt="Sign in with Google"
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
        )}
        {globalConfigContext.enabledLogin.appleAuth && (
          <img
            src="/images/auth/appleid_button.png"
            alt="Sign in with Apple"
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
        )}
      </div>
      <Divider />

      <div className={classes.footer}>
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
      <div className={classes.footer}>
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
      <div className={classes.background}>
        {transitions.map(e => {
          const { props } = e;
          return (
            <animated.div style={props}>
              <div className={classes.logoContainer}>
                <img
                  src="/images/muhnee_reverse.png"
                  width={100}
                  alt="Muhnee logo"
                  style={{ marginBottom: "1rem" }}
                />
                <Typography variant="h4">Muhnee</Typography>
                <Typography variant="h6">
                  Personal Finance, Simplified.
                </Typography>
              </div>
              <LoginContainer />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
