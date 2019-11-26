import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { SignInWithGoogleButtonProps } from "./types";

const SignInWithGoogleButton: FC<SignInWithGoogleButtonProps> = ({
  onClick = () => {}
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{ backgroundColor: "#fff", padding: 18 }}
    >
      <img
        src="/images/logos/google_logo.svg"
        style={{ width: 18, marginRight: 18 }}
      />
      Sign in With Google
    </Button>
  );
};

export default SignInWithGoogleButton;
