import React, { FC, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import AuthenticationContext from "../contexts/AuthenticationContext";
import { UserContextState, UserContext } from "../contexts/UserContext";
import { useFirestore } from "../firebase/firebase";
const UserProvider: FC = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const firestore = useFirestore();

  const [userProfile] = useDocumentData<UserContextState>(
    user ? firestore.collection("users").doc(user.uid) : null
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
