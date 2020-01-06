import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";

import { doSignOut } from "../../firebase/firebase";
import PolicyLinks from "../PolicyLinks";

import useStyles from "./styles";
import { UserAvatarMenuProps } from "./types";

const UserAvatarMenu: FC<UserAvatarMenuProps> = ({
  user,
  displayName = true
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const id = open ? "simple-popper" : undefined;

  if (!user || !user.photoURL) {
    return null;
  }
  return (
    <div className={classes.userMenuContainer}>
      {displayName && (
        <Typography className={classes.displayName}>
          <strong>{user.displayName}</strong>
        </Typography>
      )}
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
            onClick={() => {
              history.push("/account");
              handleClick(null);
            }}
            variant="outlined"
            color="primary"
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
  );
};

export default UserAvatarMenu;
