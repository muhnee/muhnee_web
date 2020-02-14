import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import SummaryTitleProps from "./types";

import useStyles from "./styles";

const SummaryTitle: FC<SummaryTitleProps> = props => {
  const { title, value } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" className={classes.value}>
        {value}
      </Typography>
    </div>
  );
};

export default SummaryTitle;
