import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import DownArrowIcon from "@material-ui/icons/ArrowDownward";
import UpArrowIcon from "@material-ui/icons/ArrowUpward";

import { green, deepOrange, orange } from "@material-ui/core/colors";

import SummaryCardProps from "./types";
import useStyles from "./styles";

const SummaryCard: FC<SummaryCardProps> = props => {
  const { title, amount, lastMonth, inverted } = props;
  const classes = useStyles(props);

  const diff = amount - (lastMonth || 0);
  const percentage = (diff / (lastMonth || 1)) * 100;

  console.log(diff, percentage);

  return (
    <div className={classes.root}>
      <Typography color="inherit" variant="body1">
        {title}
      </Typography>
      <Typography color="inherit" variant="h4">
        {`$${amount.toFixed(2)}`}
      </Typography>
      <>
        {diff >= 0 ? (
          <Typography
            variant="caption"
            style={{
              display: "flex",
              alignItems: "center",
              color: green[500]
            }}
          >
            {diff !== 0 && <UpArrowIcon className={classes.directionIcon} />}

            {`${Math.ceil(percentage)}% (+$${diff.toFixed(2)})`}
          </Typography>
        ) : (
          <Typography
            variant="caption"
            style={{
              display: "flex",
              alignItems: "center",
              color: inverted ? orange[300] : deepOrange[700]
            }}
          >
            {diff !== 0 && <DownArrowIcon className={classes.directionIcon} />}

            {`${Math.abs(Math.ceil(percentage))}% (-$${Math.abs(diff).toFixed(
              2
            )})`}
          </Typography>
        )}
      </>
    </div>
  );
};

export default SummaryCard;
