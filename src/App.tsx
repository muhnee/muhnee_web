import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MuiThemeProvider, useMediaQuery, Snackbar } from "@material-ui/core";

import MobileWarningBanner from "./components/MobileWarningBanner";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import MonthsPage from "./pages/MonthsPage";

import { AuthenticationProvider } from "./providers/AuthenticationProvider";

import muiTheme from "./config/theme";

import useStyles from "./styles";
import AuthenticatedContainer from "./containers/AuthenticatedContainer";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesProvider from "./providers/CategoriesProvider";
import NotificationProvider, {
  useNotificationState,
  useNotificationDispatch
} from "./contexts/NotificationProvider";
import SnackbarWrapper from "./components/Snackbar/Snackbar";

// CoreComponent handles the router, the state in addition to Providers for hooks
const Core: React.FC = ({ children }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:400px)");

  return (
    <MuiThemeProvider theme={muiTheme}>
      {matches && <MobileWarningBanner />}
      <div className={classes.root}>
        <Router>
          <AuthenticationProvider>
            <NotificationProvider>
              <CategoriesProvider>
                <App />
              </CategoriesProvider>
            </NotificationProvider>
          </AuthenticationProvider>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  const dispatch = useNotificationDispatch();
  const { notification } = useNotificationState();

  const handleClose = () => {
    dispatch({ type: "@@NOTIFICATION/POP" });
  };

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <AuthenticatedContainer>
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/months" component={MonthsPage} />
          <Route path="/categories" component={CategoriesPage} />
        </AuthenticatedContainer>
        <Route path="/" component={NotFoundPage} />
      </Switch>
      <Snackbar
        open={!!notification[0]}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {notification[0] && (
          <SnackbarWrapper
            message={notification[0].message}
            variant={notification[0].type}
            onClose={handleClose}
          />
        )}
      </Snackbar>
    </>
  );
};

export default Core;
