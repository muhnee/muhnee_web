import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import AppBar from "../../components/AppBar";

import LoadingContainer from "../LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const classes = useStyles();
  if (!isLoaded) {
    return <LoadingContainer loadingMessage="Authenticating..." />;
  }
  if (isLoaded && !user) {
    //TODO: save previous state so when user logins state is persistent
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <AppBar />
      <>{children}</>
    </div>
  );
};

export default AuthenticatedContainer;
