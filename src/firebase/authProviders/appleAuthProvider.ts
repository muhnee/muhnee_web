import * as firebase from "firebase";
import "firebase/auth";

const appleAuthProvider = new firebase.auth.OAuthProvider("apple.com");

appleAuthProvider.addScope("email");
appleAuthProvider.addScope("name");

export default appleAuthProvider;
