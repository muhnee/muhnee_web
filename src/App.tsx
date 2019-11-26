import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogoutPage from "./pages/LogoutPage";

import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import { MuiThemeProvider } from "@material-ui/core";
import muiTheme from "./config/theme";
import useStyles from "./styles";

// CoreComponent handles the router, the state in addition to Providers for hooks
const Core: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <Router>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Core>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/logout" component={LogoutPage} exact />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Core>
  );
};

export default App;
