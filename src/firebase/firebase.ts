import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import googleAuthProvider from "./authProviders/googleAuthProvider";

export const initialiseFirebase = async () => {
  let config = null;

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    const fbLocalConfig = process.env.REACT_APP_FIREBASE_CONFIG || "";
    config = JSON.parse(fbLocalConfig);
  } else {
    const response = await fetch("/__/firebase/init.json");
    config = await response.json();
  }

  if (config) {
    initializeApp({ ...config });
    console.log("Initialised App");
  } else {
    console.error("No Firebase Config Provided.");
  }
};

export const useAuth = () => firebase.auth();

export const doSignInWithGoogle = () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

export const doSignOut = () => firebase.auth().signOut();
