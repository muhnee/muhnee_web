import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import { Step1Props } from "./types";

import useStyles from "./styles";

const Step1: FC<Step1Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src="/images/savings.svg"
        className={classes.images}
        alt="saving money"
      />
      <div className={classes.textContainer}>
        <Typography variant="h4">
          <strong>Hello</strong>, {user && user.displayName}.
        </Typography>
        <Typography variant="h5" style={{ marginTop: "0.75rem" }}>
          Welcome to <strong>Muhnee</strong>, a simpler way to help you manage
          your money.
        </Typography>
        <Typography variant="h6" style={{ marginTop: "0.75rem" }}>
          Let's start saving and managing your money by setting up your account.
        </Typography>
      </div>
    </div>
  );
};

export default Step1;
