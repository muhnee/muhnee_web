import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

/**
 * This page lists all the transactions for the month
 */
const TransactionsPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();

  const [date, setDate] = useState<Moment>(moment(monthId, "YYYY-MM"));

  const classes = useStyles();

  if (!monthId) {
    return <div className={classes.root}>Not Found</div>;
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h6">{date.format("MMM YYYY")}</Typography>
      </div>
    </div>
  );
};

export default TransactionsPage;
