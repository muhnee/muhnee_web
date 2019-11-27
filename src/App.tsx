import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MuiThemeProvider, useMediaQuery } from "@material-ui/core";

import MobileWarningBanner from "./components/MobileWarningBanner";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";

import { AuthenticationProvider } from "./providers/AuthenticationProvider";

import muiTheme from "./config/theme";

import useStyles from "./styles";
import AuthenticatedContainer from "./containers/AuthenticatedContainer";

// CoreComponent handles the router, the state in addition to Providers for hooks
const Core: React.FC = ({ children }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:400px)");

  return (
    <MuiThemeProvider theme={muiTheme}>
      {matches && <MobileWarningBanner />}
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
        <AuthenticatedContainer>
          <Route path="/dashboard" component={DashboardPage} exact />
        </AuthenticatedContainer>
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Core>
  );
};

export default App;
