import React, { FC, useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";

import UserAvatarMenu from "../../core/UserAvatarMenu";

import AuthenticationContext from "../../../contexts/AuthenticationContext";

import { useStyles } from "./styles";
import AppBarProps from "./types";

const AppBar: FC<AppBarProps> = props => {
  const { user } = useContext(AuthenticationContext);
  const classes = useStyles();

  if (!user || !user.photoURL) {
    return null;
  }
  return (
    <Toolbar className={classes.root}>
      <div className={classes.menuItems}>
        <div className={classes.menuItemsInner}>
          <IconButton
            onClick={() => {
              props.onSidebarOpen();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="primary">
            Muhnee
          </Typography>
        </div>
      </div>
      <UserAvatarMenu user={user} />
    </Toolbar>
  );
};

export default AppBar;
