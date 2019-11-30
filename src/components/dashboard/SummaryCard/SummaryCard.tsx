import React, { FC } from "react";

import SummaryCardProps from "./types";
import useStyles from "./styles";
import { Typography, Avatar } from "@material-ui/core";

const SummaryCard: FC<SummaryCardProps> = props => {
  const { title, amount, avatar } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {avatar && (
        <div style={{ flex: 1 }}>
          <Avatar className={classes.avatar}>{avatar}</Avatar>
        </div>
      )}
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
