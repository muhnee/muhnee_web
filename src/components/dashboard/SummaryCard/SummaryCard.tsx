import React, { FC } from "react";

import DownArrowIcon from "@material-ui/icons/ArrowDownward";
import UpArrowIcon from "@material-ui/icons/ArrowUpward";

import SummaryCardProps from "./types";
import useStyles from "./styles";

import { Typography, Avatar } from "@material-ui/core";
import { green, deepOrange, orange } from "@material-ui/core/colors";

const SummaryCard: FC<SummaryCardProps> = props => {
  const { title, amount, avatar, lastMonth, inverted } = props;
  const classes = useStyles(props);

  let diff: number = 0;
  let percentage: number = 0;
  if (lastMonth) {
    diff = amount - lastMonth;
    percentage = (diff / (lastMonth || 1)) * 100;
  }

  return (
    <div className={classes.root}>
      {avatar && (
        <div style={{ flex: 1 }}>
          <Avatar className={classes.avatar}>{avatar}</Avatar>
        </div>
      )}
      <Typography color="inherit" variant="body1">
        {title}
      </Typography>
      <Typography color="inherit" variant="h6">
        {`$${amount.toFixed(2)}`}
      </Typography>
      {lastMonth && (
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
              {diff !== 0 && <UpArrowIcon />}

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
              {diff !== 0 && <DownArrowIcon />}

              {`${Math.abs(Math.ceil(percentage))}% (-$${Math.abs(diff).toFixed(
                2
              )})`}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default SummaryCard;
