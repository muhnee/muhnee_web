import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { doSignInWithGoogle } from "../../firebase/auth";

const LandingPage: FC = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);

  // if the user is logged in then redirect to dashboard
  if (isLoaded && user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      Hello World!
      <button onClick={() => doSignInWithGoogle()}>Sign In With Google</button>
    </div>
  );
};

export default LandingPage;
