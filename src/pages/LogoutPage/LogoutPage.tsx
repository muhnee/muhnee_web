import React, { FC, useEffect, useContext } from "react";
import { doSignOut } from "../../firebase/auth";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import { Redirect } from "react-router";

const LogoutPage: FC = () => {
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    doSignOut();
  }, []);

  if (!user) {
    return <Redirect to="/" />;
  }

  return <div>Logging out...</div>;
};

export default LogoutPage;
