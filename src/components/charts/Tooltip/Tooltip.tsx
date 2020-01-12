import React, { FC } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import TooltipProps from "./types";

const Tooltip: FC<TooltipProps> = ({ title, description }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      )}
    </Paper>
  );
};

export default Tooltip;
