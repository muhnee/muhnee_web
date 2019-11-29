import React, { FC } from "react";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { SignInWithFacebookButtonProps } from "./types";

const SignInWithFacebookButton: FC<SignInWithFacebookButtonProps> = ({
  onClick = () => {}
}) => {
  return (
    <Chip
      size="medium"
      style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
      onClick={onClick}
      avatar={<Avatar src="/images/logos/facebook_logo.png" />}
      label="Sign in With Facebook"
    />
  );
};

export default SignInWithFacebookButton;
