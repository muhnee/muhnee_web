import React, { FC } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

import { SidebarLinkProps } from "./types";

const SidebarLink: FC<SidebarLinkProps> = props => {
  const location = useLocation();
  const history = useHistory();

  const classes = useStyles(props);
  const { to, label, icon } = props;

  const isPageOpen = `/${location.pathname.split("/")[1]}` === to;

  return (
    <ListItem
      component={Link}
      onClick={() => history.push(to)}
      className={classes.root}
      button
    >
      <div>{icon}</div>
      {isPageOpen && (
        <Typography
          style={{
            fontWeight: isPageOpen ? 600 : 500
          }}
        >
          {label}
        </Typography>
      )}
    </ListItem>
  );
};

export default SidebarLink;
