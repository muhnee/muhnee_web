import React, { FC } from "react";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { SignInWithGoogleButtonProps } from "./types";

const SignInWithGoogleButton: FC<SignInWithGoogleButtonProps> = ({
  onClick = () => {}
}) => {
  return (
    <Chip
      size="medium"
      style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
      onClick={onClick}
      avatar={<Avatar src="/images/logos/google_logo.svg" />}
      label="Sign in With Google"
    />
  );
};

export default SignInWithGoogleButton;
