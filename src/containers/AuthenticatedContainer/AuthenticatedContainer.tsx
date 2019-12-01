import React, { FC, useContext } from "react";
import { Redirect, useLocation } from "react-router";

import AppBar from "../../components/AppBar";

import LoadingContainer from "../LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";
//TODO: move to named imports
import {
  List,
  ListItemText,
  ListItem,
  Link,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/InsertChart";

import { blue } from "@material-ui/core/colors";
import moment from "moment";

const AuthenticatedContainer: FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const location = useLocation();
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
          <ListItem
            component={Link}
            href="/dashboard"
            style={{
              color: location.pathname === "/dashboard" ? "#2e2e2e" : `#777`,
              borderRight:
                location.pathname === "/dashboard"
                  ? `2px solid ${blue[500]}`
                  : "none"
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  color:
                    location.pathname === "/dashboard" ? blue[500] : `#777`,
                  backgroundColor: "white"
                }}
              >
                <DashboardIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: {
                  fontWeight: location.pathname === "/dashboard" ? 600 : 500
                }
              }}
            >
              Dashboard
            </ListItemText>
          </ListItem>
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
        <>{children}</>
      </div>
    </div>
  );
};

export default AuthenticatedContainer;
