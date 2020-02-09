import React, { FC, useEffect, useState } from "react";
import useStyles from "./styles";
import { IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

const MobileWarningBanner: FC = () => {
  const [displayed, setDisplayed] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const localStorage = window.localStorage;
    const isDismissed = localStorage.getItem("mobileDismissed") || false;

    setDisplayed(!isDismissed);
  }, [setDisplayed]);

  return (
    <div
      className={classes.root}
      style={{ display: displayed ? "flex" : "none" }}
    >
      <div style={{ flex: 1 }}>Try the Muhnee Mobile App Today!</div>
      <IconButton
        onClick={() => {
          setDisplayed(false);
          window.localStorage.setItem("mobileDismissed", "true");
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default MobileWarningBanner;
