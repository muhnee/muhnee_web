import * as firebase from "firebase";
import "firebase/auth";

let facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export default facebookAuthProvider;
