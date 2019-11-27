import React, { FC, useContext } from "react";
import {
  Typography,
  AppBar as ApplicationBar,
  Toolbar,
  Avatar
} from "@material-ui/core";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useStyles } from "./styles";

const AppBar: FC = () => {
  const { user, isLoaded } = useContext(AuthenticationContext);
  const classes = useStyles();

  if (!isLoaded && !user) {
    return null;
  }

  return (
    <ApplicationBar position="sticky">
      <Toolbar>
        <div className={classes.menuItems}>
          <Typography variant="h6">Muhnee</Typography>
        </div>
        <div>{user && user.photoURL && <Avatar src={user.photoURL} />}</div>
      </Toolbar>
    </ApplicationBar>
  );
};

export default AppBar;
