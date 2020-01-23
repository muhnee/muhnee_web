import React, { FC, useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";

import Onboarding from "../../components/onboarding";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { UserContext } from "../../contexts/UserContext";

import useStyles from "./styles";
import { Paper } from "@material-ui/core";
import LoadingContainer from "../../containers/LoadingContainer";
import { useFirestore } from "../../firebase/firebase";

const OnboardingPage: FC = () => {
  const [step, setStep] = useState(0);

  const { user, isLoaded } = useContext(AuthenticationContext);
  const { loaded, onboarded } = useContext(UserContext);
  const firestore = useFirestore();

  const history = useHistory();

  const classes = useStyles();

  const transitions = useTransition(step, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
  });

  const finaliseSetup = () => {
    if (user && user.uid) {
      firestore
        .collection("users")
        .doc(user.uid)
        .update({
          onboarded: true
        })
        .then(() => {
          history.push("/dashboard");
        });
    }
  };

  if (isLoaded && !user) {
    return null;
  }

  if (!user || !loaded || !isLoaded) {
    return (
      <LoadingContainer
        loadingMessage="Checking user..."
        subtitle="Hold your horses!"
      />
    );
  }

  if (loaded && onboarded) {
    return <Redirect to="/dashboard" />;
  }

  const pages = [
    <Onboarding.Step1 user={user} />,
    <Onboarding.Step2 user={user} />,
    <Onboarding.Step3 user={user} />,
    <Onboarding.Step4 user={user} />
  ];
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div style={{ flex: 1 }}>
          {transitions.map(({ item, props, key }) => {
            const page = pages[item];
            return (
              <animated.div style={props} key={key}>
                {page}
              </animated.div>
            );
          })}
        </div>
        <MobileStepper
          variant="dots"
          steps={4}
          position="static"
          activeStep={step}
          className={classes.stepContainer}
          nextButton={
            step !== 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                variant="outlined"
                color="primary"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={() => finaliseSetup()}
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
            )
          }
          backButton={
            <Button
              onClick={() => setStep(step - 1)}
              variant="outlined"
              color="primary"
            >
              Previous Step
            </Button>
          }
        />
      </Paper>
    </div>
  );
};

export default OnboardingPage;
