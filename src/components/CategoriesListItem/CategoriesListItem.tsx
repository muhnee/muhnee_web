import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

import CategoriesListItemProps from "./types";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

const CategoriesListItem: FC<CategoriesListItemProps> = ({
  onRemove,
  category,
  onAvatarClick = () => {},
  type
}) => {
  const [avatarIcon, setAvatarIcon] = useState("");
  const dispatchNotifications = useNotificationDispatch();

  useEffect(() => {
    async function getIcon() {
      if (category.icon) {
        const firebaseRef = firebase
          .storage()
          .refFromURL(`gs://muhnee-app.appspot.com/${category.icon}`);
        try {
          setAvatarIcon(await firebaseRef.getDownloadURL());
        } catch (e) {
          console.error(e);
          setAvatarIcon("");
          if (e.code === "storage/object-not-found") {
            dispatchNotifications({
              type: "@@NOTIFICATION/PUSH",
              notification: {
                message: `Cannot find receipt`,
                type: "error"
              }
            });
          } else {
            dispatchNotifications({
              type: "@@NOTIFICATION/PUSH",
              notification: {
                message: `an unknown error occurred.`,
                type: "error"
              }
            });
          }
        }
      } else {
        setAvatarIcon("");
      }
    }
    getIcon();
  }, [avatarIcon, category.icon, dispatchNotifications, setAvatarIcon]);

  return (
    <ListItem key={category.id}>
      <ListItemAvatar>
        <Avatar
          src={avatarIcon}
          onClick={() => {
            onAvatarClick(type, category.id, category.name);
          }}
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
