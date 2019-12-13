import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import { EmptyStateContainerProps } from "./types";

const EmptyStateContainer: FC<EmptyStateContainerProps> = ({
  title = "Nothing here",
  caption = null
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body1" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Create a transaction to get started
      </Typography>
    </div>
  );
};

export default EmptyStateContainer;
