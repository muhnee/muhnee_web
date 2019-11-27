import React, { FC, useContext } from "react";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Redirect } from "react-router";
import AppBar from "../../components/AppBar";
import { useStyles } from "./styles";

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);

  const classes = useStyles();

  if (!isLoaded) {
    return <div>Authenticating...</div>;
  }
  if (isLoaded && !user) {
    //TODO: save previous state so when user logins state is persistent
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.root}>
        <AppBar />
        <>{children}</>
      </div>
    );
  }
};

export default AuthenticatedContainer;
