import React, { FC, useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

import CategoriesListItemProps from "./types";
import CategoryIconAvatar from "../CategoryIconAvatar";

const CategoriesListItem: FC<CategoriesListItemProps> = ({
  onRemove,
  category,
  onAvatarClick = () => {},
  type,
  secondaryTitle = null,
  onUpdate = () => {},
  editable = true
}) => {
  const [name, setName] = useState(category.name);
  const [readMode, setReadMode] = useState<Boolean>(true);

  return (
    <ListItem key={category.id}>
      <ListItemAvatar>
        <CategoryIconAvatar
          onClick={() => {
            onAvatarClick(type, category.id, category.name);
          }}
          category={category}
          type={type}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          readMode ? (
            <>
              {name}
              {editable && (
                <IconButton
                  style={{ padding: "0.1rem" }}
                  onClick={() => setReadMode(!readMode)}
                >
                  <EditIcon style={{ width: "0.75rem", height: "0.75rem" }} />
                </IconButton>
              )}
            </>
          ) : (
            <TextField
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  // then trigger save
                  if (name) {
                    onUpdate(name, category.id, type);
                    setReadMode(!readMode);
                  }
                }
              }}
              onBlur={event => {
                if (name) {
                  onUpdate(name, category.id, type);
                  setReadMode(!readMode);
                }
              }}
            />
          )
        }
        secondary={secondaryTitle}
      />
      {onRemove && (
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => onRemove(type, category.id, category.name)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default CategoriesListItem;
