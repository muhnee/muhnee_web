import React, { FC, useContext, useState } from "react";
import { Redirect } from "react-router";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AppBar from "../../components/layouts/AppBar";
import SidebarLink from "../../components/core/sidebar/SidebarLink/SidebarLink";
import UserAvatarMenu from "../../components/core/UserAvatarMenu";
import Footer from "../../components/layouts/Footer";

import LoadingContainer from "../LoadingContainer";

import DashboardIcon from "@material-ui/icons/InsertChart";
import CategoriesIcon from "@material-ui/icons/Category";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";
import { UserContext } from "../../contexts/UserContext";

const SidebarInner: FC = () => {
  return (
    <>
      <List style={{ flex: 1, marginTop: "1rem" }}>
        {/**
         * TODO: move this to individual component
         */}
        <SidebarLink
          icon={<DashboardIcon />}
          to="/dashboard"
          label="Dashboard"
        />
        <SidebarLink
          icon={<CategoriesIcon />}
          to="/categories"
          label="Categories"
        />
      </List>
    </>
  );
};

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const { loaded, onboarded } = useContext(UserContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const classes = useStyles();
  if (!isLoaded) {
    return <LoadingContainer loadingMessage="Authenticating..." />;
  }
  if (isLoaded && !user) {
    //TODO: save previous state so when user logins state is persistent
    return <Redirect to="/" />;
  }
  if (loaded && !onboarded) {
    return <Redirect to="/start" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <ListItem style={{ marginBottom: "1.25rem" }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "h5",
              style: { color: "#fff" }
            }}
          >
            Muhnee
          </ListItemText>
        </ListItem>

        <SidebarInner />
        <div
          style={{
            minHeight: 100,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {user && <UserAvatarMenu user={user} displayName={false} />}
        </div>
      </div>
      <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <SidebarInner />
      </Drawer>
      <div className={classes.mainContainer}>
        <div className={classes.appBar}>
          <AppBar onSidebarOpen={() => setSidebarOpen(true)} />
        </div>
        <div style={{ padding: "0.25rem 0.5rem", flex: 1, display: "flex" }}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedContainer;
