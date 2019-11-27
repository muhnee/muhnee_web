import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { SignInWithGoogleButtonProps } from "./types";
import { ButtonBase, Chip, Avatar } from "@material-ui/core";

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
