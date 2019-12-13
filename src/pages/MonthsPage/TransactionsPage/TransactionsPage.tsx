import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment, { Moment } from "moment";

import Typography from "@material-ui/core/Typography";

import MonthTransactionsContainer from "../../../containers/MonthTransactionsContainer";

import useStyles from "./styles";
import { Button } from "@material-ui/core";

/**
 * This page lists all the transactions for the month
 */
const TransactionsPage: FC = () => {
  // React Router Hooks
  const history = useHistory();
  let { monthId } = useParams();

  const date: Moment = moment(monthId, "YYYY-MM");

  const classes = useStyles();

  if (!monthId) {
    return <div className={classes.root}>Not Found</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Button onClick={() => history.goBack()}>&larr; Go Back</Button>
        </div>
        <div>
          <Typography variant="h6">{`Transactions for ${date.format(
            "MMMM YYYY"
          )}`}</Typography>
        </div>
        <div className={classes.monthlySummaryContainer}>
          <div className={classes.monthlySummaryCard}>Monthly income</div>
          <div className={classes.monthlySummaryCard}>Monthly expenses</div>
          <div className={classes.monthlySummaryCard}>
            Monthly total savings
          </div>
          <div className={classes.monthlySummaryCard}>Monthly goal</div>
        </div>
      </div>
      <div className={classes.main}>
        <Typography variant="h6" color="textSecondary">
          Transactions this month
        </Typography>
        <MonthTransactionsContainer
          month={date}
          shouldDisplayAddTransactionModal={true}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
