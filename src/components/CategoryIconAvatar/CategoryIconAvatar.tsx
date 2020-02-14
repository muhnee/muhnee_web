import React, { FC, useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CategoryIconAvatarProps } from "./types";
import useStyles from "./styles";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import { useStorage } from "../../firebase/firebase";

const CategoryIconAvatar: FC<CategoryIconAvatarProps> = props => {
  const { onClick = () => {}, category } = props;
  const classes = useStyles(props);

  const storage = useStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [avatarIcon, setAvatarIcon] = useState("");
  const dispatchNotifications = useNotificationDispatch();

  useEffect(() => {
    async function getIcon() {
      setIsLoading(true);
      if (category && category.icon) {
        const firebaseRef = storage.ref(`/${category.icon}`);

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
    setIsLoading,
    storage
  ]);
  if (isLoading) {
    return (
      <Avatar>
        <CircularProgress />
      </Avatar>
    );
  }

  if (avatarIcon) {
    return (
      <Avatar
        onClick={onClick}
        src={avatarIcon}
        style={{ borderRadius: "33% 0" }}
      />
    );
  }
  return (
    <Avatar onClick={onClick} className={classes.avatar}>
      {category.name[0]}
    </Avatar>
  );
};

export default CategoryIconAvatar;
