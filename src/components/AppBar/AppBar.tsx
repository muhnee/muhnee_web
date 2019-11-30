import React, { FC, useContext, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import PolicyLinks from "../PolicyLinks";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";
import { doSignOut } from "../../firebase/firebase";

const AppBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthenticationContext);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  if (!user || !user.photoURL) {
    return null;
  }
  return (
    <Toolbar className={classes.root}>
      <div className={classes.menuItems}></div>
      <div className={classes.userMenuContainer}>
        <Typography className={classes.displayName}>
          <strong>{user.displayName}</strong>
        </Typography>
        <Avatar src={user.photoURL} onClick={handleClick} />
        <Menu
          id={id}
          open={open}
          anchorEl={anchorEl}
          className={classes.paper}
          onClose={handleClick}
        >
          <div className={classes.userDialogHeader}>
            <Avatar src={user.photoURL} className={classes.bigAvatar} />
            <Typography variant="body1" color="textPrimary">
              {user.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </div>

          <Divider />
          <div
            className={classes.userDialogHeader}
            style={{ marginTop: "0.5rem" }}
          >
            <Button
              // onClick={() => doSignOut()}
              variant="outlined"
              color="primary"
              disabled
            >
              My Account
            </Button>
            <Button
              onClick={() => doSignOut()}
              variant="outlined"
              color="primary"
            >
              Sign out
            </Button>
          </div>

          <Divider />
          <PolicyLinks />
        </Menu>
      </div>
    </Toolbar>
  );
};

export default AppBar;