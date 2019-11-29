import React, { FC } from "react";

import SummaryCardProps from "./types";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

const SummaryCard: FC<SummaryCardProps> = props => {
  const { title, amount } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography color="inherit" variant="h6">
        {amount}
      </Typography>
      <Typography color="inherit" variant="body1">
        {title}
      </Typography>
    </div>
  );
};

export default SummaryCard;
