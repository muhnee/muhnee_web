import React, { FC } from "react";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

import CategoriesListItemProps from "./types";

const CategoriesListItem: FC<CategoriesListItemProps> = ({
  onRemove,
  category
}) => {
  return (
    <ListItem key={category.id}>
      <ListItemAvatar>
        <Avatar src={category.icon} />
      </ListItemAvatar>
      <ListItemText primary={category.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CategoriesListItem;
