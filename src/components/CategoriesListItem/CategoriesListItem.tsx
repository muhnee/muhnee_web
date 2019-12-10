import React, { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

import CategoriesListItemProps from "./types";
import CategoryIconAvatar from "../CategoryIconAvatar";

const CategoriesListItem: FC<CategoriesListItemProps> = ({
  onRemove,
  category,
  onAvatarClick = () => {},
  type
}) => {
  return (
    <ListItem key={category.id}>
      <ListItemAvatar>
        <CategoryIconAvatar
          onClick={() => {
            onAvatarClick(type, category.id, category.name);
          }}
          category={category}
        />
      </ListItemAvatar>
      <ListItemText primary={category.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onRemove(type, category.id, category.name)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CategoriesListItem;
