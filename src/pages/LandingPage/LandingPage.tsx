import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import AuthenticationContext from "../../contexts/AuthenticationContext";

const LandingPage: FC = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);

  // if the user is logged in then redirect to dashboard
  if (isLoaded && user) {
    return <Redirect to="/dashboard" />;
  }

  return <div>Hello World!</div>;
};

export default LandingPage;
