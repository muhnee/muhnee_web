import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { initialiseFirebase } from "./firebase/firebase";
import { MuiThemeProvider } from "@material-ui/core";
import LoadingContainer from "./containers/LoadingContainer";
import muiTheme from "./config/theme";

(async () => {
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
