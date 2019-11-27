import React, { FC } from "react";
import { LoadingContainerProps } from "./types";
import { CircularProgress, Typography } from "@material-ui/core";
import useStyles from "./styles";

const LoadingContainer: FC<LoadingContainerProps> = ({
  loadingMessage = "Loading...",
  subtitle = ""
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
      <div className={classes.message}>
        <Typography variant="body1" color="textPrimary">
          {loadingMessage}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default LoadingContainer;
