import React, { FC, useContext } from "react";
import { Redirect } from "react-router";
import moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import AppBar from "../../components/AppBar";
import SidebarLink from "../../components/sidebar/SidebarLink/SidebarLink";

import LoadingContainer from "../LoadingContainer";

import DashboardIcon from "@material-ui/icons/InsertChart";
import CategoriesIcon from "@material-ui/icons/Category";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const classes = useStyles();
  if (!isLoaded) {
    return <LoadingContainer loadingMessage="Authenticating..." />;
  }
  if (isLoaded && !user) {
    //TODO: save previous state so when user logins state is persistent
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <div
        style={{
          padding: "0.25rem 0 0.25rem 0.25rem",
          width: 200,
          borderRight: "1px solid #ccc",
          height: "100vh",
          position: "fixed",
          zIndex: 3,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <List style={{ flex: 1 }}>
          <ListItem style={{ marginBottom: "2.5rem" }}>
            <ListItemText
              primaryTypographyProps={{ variant: "h5", color: "primary" }}
            >
              Muhnee
            </ListItemText>
          </ListItem>
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
        <div style={{ marginBottom: "2rem", padding: "0.25rem 0.75rem" }}>
          <Typography variant="body1" color="textSecondary">
            <Link
              href="https://muhneeapp.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Muhnee
            </Link>{" "}
            v{process.env.REACT_APP_VERSION}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Copyright &copy; 2019{" "}
            {moment().year() !== 2019 ? `- ${moment().year()}` : ``}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "scroll",
          height: "100vh",
          marginLeft: 200
        }}
      >
        <AppBar />
        <div style={{ padding: "0.25rem 0.5rem" }}>{children}</div>
      </div>
    </div>
  );
};

export default AuthenticatedContainer;
