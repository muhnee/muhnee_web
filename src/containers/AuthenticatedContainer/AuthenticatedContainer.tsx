import React, { FC, useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import moment from "moment";

import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import AppBar from "../../components/AppBar";
import SidebarLink from "../../components/sidebar/SidebarLink/SidebarLink";
import UserAvatarMenu from "../../components/UserAvatarMenu";

import LoadingContainer from "../LoadingContainer";

import DashboardIcon from "@material-ui/icons/InsertChart";
import CategoriesIcon from "@material-ui/icons/Category";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";
import { Drawer, Avatar } from "@material-ui/core";
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
  const history = useHistory();
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
        <div
          style={{
            marginBottom: "2rem",
            padding: "0.25rem 0.75rem"
          }}
        >
          <Typography variant="body1" color="inherit">
            <Link
              href="https://muhneeapp.com"
              target="_blank"
              rel="noreferrer noopener"
              color="inherit"
              style={{
                textDecoration: "underline"
              }}
            >
              Muhnee
            </Link>{" "}
            v{process.env.REACT_APP_VERSION}
          </Typography>
          <Typography variant="body1" color="inherit">
            Copyright &copy; Muhnee 2019{" "}
            {moment().year() !== 2019 ? `- ${moment().year()}` : ``}
          </Typography>
          <Typography variant="body1">
            Facing issues? Click{" "}
            <Link
              href="https://muhnee.atlassian.net/servicedesk/customer/portal/2"
              target="_blank"
              rel="noreferrer noopener"
              color="inherit"
              style={{
                textDecoration: "underline"
              }}
            >
              here
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedContainer;
