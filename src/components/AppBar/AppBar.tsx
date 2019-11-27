import React, { FC, useContext, useState } from "react";

import ApplicationBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { useStyles } from "./styles";

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
    <ApplicationBar position="sticky">
      <Toolbar>
        <div className={classes.menuItems}>
          <Typography variant="h6">Muhnee</Typography>
        </div>
        <div>
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
              <Button href="/logout" variant="outlined">
                Sign out
              </Button>
            </div>

            <Divider />
            <div className={classes.termsLink}>
              <Typography variant="caption" color="textSecondary">
                Privacy Policy
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Terms of Use
              </Typography>
            </div>
          </Menu>
        </div>
      </Toolbar>
    </ApplicationBar>
  );
};

export default AppBar;
