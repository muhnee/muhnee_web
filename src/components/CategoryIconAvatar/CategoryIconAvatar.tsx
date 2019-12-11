import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";

import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CategoryIconAvatarProps } from "./types";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

const CategoryIconAvatar: FC<CategoryIconAvatarProps> = ({
  onClick = () => {},
  category
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarIcon, setAvatarIcon] = useState("");
  const dispatchNotifications = useNotificationDispatch();

  useEffect(() => {
    async function getIcon() {
      setIsLoading(true);
      if (category && category.icon) {
        const firebaseRef = firebase
          .storage()
          .refFromURL(`gs://muhnee-app.appspot.com/${category.icon}`);

        try {
          setAvatarIcon(await firebaseRef.getDownloadURL());
          setIsLoading(false);
        } catch (e) {
          setAvatarIcon("");
          setIsLoading(false);
        }
      } else {
        setAvatarIcon("");
        setIsLoading(false);
      }
    }
    getIcon();
  }, [
    avatarIcon,
    category,
    dispatchNotifications,
    setAvatarIcon,
    setIsLoading
  ]);
  if (isLoading) {
    return (
      <Avatar>
        <CircularProgress />
      </Avatar>
    );
  }

  return <Avatar onClick={onClick} src={avatarIcon} />;
};

export default CategoryIconAvatar;
