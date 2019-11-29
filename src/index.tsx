import React from "react";
import ReactDOM from "react-dom";

import { MuiThemeProvider } from "@material-ui/core";

import LoadingContainer from "./containers/LoadingContainer";

import App from "./App";

import { initialiseFirebase } from "./firebase/firebase";
import muiTheme from "./config/theme";

import * as serviceWorker from "./serviceWorker";

import "./index.css";

(async () => {
  // REDIRECT FROM FIREBASE HOSTED URLs
  if (
    window.location.hostname === "muhnee-app.web.app" ||
    window.location.hostname === "muhnee-app.firebaseapp.com"
  ) {
    window.location.replace("http://web.muhneeapp.com");
  }

  const targetElement = document.getElementById("root");
  ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
      <LoadingContainer />
    </MuiThemeProvider>,
    targetElement
  );
  await initialiseFirebase();
  ReactDOM.render(<App />, targetElement);
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
