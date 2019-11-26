import firebase from "firebase";
import googleAuthProvider from "./authProviders/googleAuthProvider";

export const doSignInWithGoogle = () => {
  firebase.auth().signInWithPopup(googleAuthProvider);
};

export const doSignOut = async () => {
  await firebase.auth().signOut();
};
