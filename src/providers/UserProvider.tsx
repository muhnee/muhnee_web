import React, { FC, useContext } from "react";
import firebase from "firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

import AuthenticationContext from "../contexts/AuthenticationContext";
import { UserContextState, UserContext } from "../contexts/UserContext";

const UserProvider: FC = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [userProfile] = useDocumentData<UserContextState>(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
      : null
  );

  const userContent: UserContextState = {
    displayName: userProfile ? userProfile.displayName : undefined,
    email: userProfile ? userProfile.email : undefined,
    emailVerified: userProfile ? userProfile.emailVerified : false,
    onboarded: userProfile ? userProfile.onboarded : false,
    photoURL: userProfile ? userProfile.photoURL : undefined,
    loaded: Boolean(userProfile)
  };

  return (
    <UserContext.Provider value={userContent}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
