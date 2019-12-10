import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";

import Avatar from "@material-ui/core/Avatar";

import { CategoryIconAvatarProps } from "./types";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

const CategoryIconAvatar: FC<CategoryIconAvatarProps> = ({
  onClick = () => {},
  category
}) => {
  const [avatarIcon, setAvatarIcon] = useState("");
  const dispatchNotifications = useNotificationDispatch();

  useEffect(() => {
    async function getIcon() {
      if (category && category.icon) {
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
  }, [avatarIcon, category, dispatchNotifications, setAvatarIcon]);

  return <Avatar onClick={onClick} src={avatarIcon} />;
};

export default CategoryIconAvatar;
