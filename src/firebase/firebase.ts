import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import googleAuthProvider from "./authProviders/googleAuthProvider";
import facebookAuthProvider from "./authProviders/facebookAuthProvider";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
export const fbApp = firebase.initializeApp(firebaseConfig);

export const useAuth = () => fbApp.auth();

export const useFirestore = () => fbApp.firestore();

export const useStorage = () => fbApp.storage();

export const doSignInWithGoogle = () => {
  return fbApp.auth().signInWithRedirect(googleAuthProvider);
};

export const doSignInWithFacebook = () =>
  fbApp.auth().signInWithRedirect(facebookAuthProvider);

export const doSignOut = () => fbApp.auth().signOut();
