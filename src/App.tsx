import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MuiThemeProvider } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MobileWarningBanner from "./components/layouts/MobileWarningBanner";
import SnackbarWrapper from "./components/core/Snackbar/Snackbar";
import AddTransactionDialog from "./components/dialogs/AddTransactionDialog";
import AboutDialog from "./components/dialogs/AboutDialog";
import UpdateMonthlyGoalDialog from "./components/dialogs/UpdateMonthlyGoalDialog";
import AddCategoryDialog from "./components/dialogs/AddCategoryDialog";

import LoadingContainer from "./containers/LoadingContainer";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import MonthsPage from "./pages/MonthsPage";
import OnboardingPage from "./pages/OnboardingPage";
import CategoriesPage from "./pages/CategoriesPage";
import AccountPage from "./pages/AccountPage";
import MaintenancePage from "./pages/MaintenancePage";

import AuthenticatedContainer from "./containers/AuthenticatedContainer";
import CategoriesProvider from "./providers/CategoriesProvider";
import GlobalConfigProvider from "./providers/GlobalConfigProvider";
import UserProvider from "./providers/UserProvider";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";

import NotificationProvider, {
  useNotificationState,
  useNotificationDispatch
} from "./contexts/NotificationProvider";
import UIProvider, { useState, useUIDispatch } from "./contexts/UIProvider";
import GlobalConfigContext from "./contexts/GlobalConfigContext";

import muiTheme from "./config/theme";

import useStyles from "./styles";
import UpcomingTransactionsPage from "./pages/UpcomingTransactionsPage";

// CoreComponent handles the router, the state in addition to Providers for hooks
const Core: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:400px)");

  return (
    <MuiThemeProvider theme={muiTheme}>
      {matches && <MobileWarningBanner />}
      <div className={classes.root}>
        <Router>
          <GlobalConfigProvider>
            <AuthenticationProvider>
              <NotificationProvider>
                <UIProvider>
                  <CategoriesProvider>
                    <UserProvider>
                      <App />
                    </UserProvider>
                  </CategoriesProvider>
                </UIProvider>
              </NotificationProvider>
            </AuthenticationProvider>
          </GlobalConfigProvider>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  const dispatch = useNotificationDispatch();
  const { notification } = useNotificationState();
  const {
    addTransactionModalOpen,
    editMonthlyGoalOpen,
    date,
    addCategoryDialogOpen,
    aboutDialogOpen
  } = useState();
  const dispatchModalClose = useUIDispatch();
  const { maintenance, isLoading } = useContext(GlobalConfigContext);

  const handleClose = () => {
    dispatch({ type: "@@NOTIFICATION/POP" });
  };

  const handleModalClose = () => {
    dispatchModalClose({
      type: "@@UI/ADD_TRANSACTION_MODAL_CLOSE"
    });
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (!isLoading && maintenance.enabled) {
    return (
      <Switch>
        <Route path="/" component={MaintenancePage} />
      </Switch>
    );
  }

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/start" component={OnboardingPage} />
        <AuthenticatedContainer>
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/account" component={AccountPage} exact />
          <Route path="/months" component={MonthsPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/scheduled" component={UpcomingTransactionsPage} />
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
      <AddTransactionDialog
        open={addTransactionModalOpen}
        onClose={() => {
          handleModalClose();
        }}
      />
      <UpdateMonthlyGoalDialog
        open={editMonthlyGoalOpen}
        date={date}
        onClose={() =>
          dispatchModalClose({ type: "@@UI/EDIT_MONTHLY_GOAL_MODAL_CLOSE" })
        }
      />
      <AddCategoryDialog
        open={addCategoryDialogOpen}
        onClose={() =>
          dispatchModalClose({ type: "@@UI/ADD_CATEGORY_DIALOG_CLOSE" })
        }
      />
      <AboutDialog
        open={aboutDialogOpen}
        onClose={() => dispatchModalClose({ type: "@@UI/ABOUT_DIALOG_CLOSE" })}
      />
    </>
  );
};

export default Core;
