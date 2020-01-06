import React, { FC } from "react";

import Skeleton from "@material-ui/lab/Skeleton";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import { MonthlySummaryCardProps } from "./types";
import useStyles from "./styles";

const MonthlySummaryCard: FC<MonthlySummaryCardProps> = props => {
  const { isLoading, hasErrored, title, value, secondaryAction } = props;
  const classes = useStyles(props);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Skeleton variant="rect" width={100} height={"1rem"} />
      </div>
    );
  }

  if (hasErrored) {
    return (
      <div className={classes.root}>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          Something went wrong. Try again later
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      <div className={classes.value}>
        <Typography
          variant="body1"
          color="textPrimary"
          style={{ marginRight: "0.1rem" }}
        >
          {value}
        </Typography>
        {secondaryAction}
      </div>
    </div>
  );
};
export default MonthlySummaryCard;
