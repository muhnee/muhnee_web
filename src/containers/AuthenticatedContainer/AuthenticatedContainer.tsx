import React, { FC, useContext } from "react";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Redirect } from "react-router";

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);

  if (!isLoaded) {
    return <div>Authenticating...</div>;
  }
  if (isLoaded && !user) {
    //TODO: save previous state so when user logins state is persistent
    return <Redirect to="/" />;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default AuthenticatedContainer;
