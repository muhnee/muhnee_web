import React, { FC } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import useStyles from "./styles";

import { SidebarLinkProps } from "./types";

const SidebarLink: FC<SidebarLinkProps> = props => {
  const location = useLocation();
  const history = useHistory();

  const classes = useStyles(props);
  const { to, label, icon } = props;

  const isPageOpen = location.pathname === to;

  return (
    <ListItem
      component={Link}
      onClick={() => history.push(to)}
      className={classes.root}
      button
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          style: {
            fontWeight: isPageOpen ? 600 : 500
          }
        }}
      >
        {label}
      </ListItemText>
    </ListItem>
  );
};

export default SidebarLink;
