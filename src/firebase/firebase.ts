import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import googleAuthProvider from "./authProviders/googleAuthProvider";
import facebookAuthProvider from "./authProviders/facebookAuthProvider";

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

export const useFirestore = () => firebase.firestore();

export const useStorage = () => firebase.storage();

export const doSignInWithGoogle = () => {
  return firebase.auth().signInWithRedirect(googleAuthProvider);
};

export const doSignInWithFacebook = () =>
  firebase.auth().signInWithRedirect(facebookAuthProvider);

export const doSignOut = () => firebase.auth().signOut();
