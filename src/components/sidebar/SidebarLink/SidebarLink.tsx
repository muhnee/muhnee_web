import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import { SidebarLinkProps } from "./types";
import { blue } from "@material-ui/core/colors";

const SidebarLink: FC<SidebarLinkProps> = ({ to, label, icon }) => {
  const location = useLocation();

  const isPageOpen = location.pathname === to;

  return (
    <ListItem
      component={Link}
      href={to}
      style={{
        color: isPageOpen ? "#2e2e2e" : `#777`,
        borderRight: isPageOpen ? `2px solid ${blue[500]}` : "none"
      }}
    >
      <ListItemAvatar>
        <Avatar
          style={{
            color: isPageOpen ? blue[500] : `#777`,
            backgroundColor: "white"
          }}
        >
          {icon}
        </Avatar>
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
