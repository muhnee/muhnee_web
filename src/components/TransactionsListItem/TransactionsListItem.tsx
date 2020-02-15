import React, { FC } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import RecurringIcon from "@material-ui/icons/Loop";

import MoneyTypography from "../core/MoneyTypography";
import CategoryItemAvatar from "../CategoryIconAvatar";

import TransactionsListItemProps from "./types";

import useStyles from "./styles";

const CoreListItem: FC<TransactionsListItemProps> = ({
  transaction,
  isButton,
  children
}) => {
  const classes = useStyles();
  const history = useHistory();
  const timestamp = moment(transaction.timestamp);
  if (isButton) {
    return (
      <ListItem
        className={classes.root}
        onClick={() =>
          history.push(
            `/months/${timestamp.year()}-${timestamp.month() +
              1}/transactions/${transaction.id}`
          )
        }
        button
      >
        {children}
      </ListItem>
    );
  } else {
    return <ListItem className={classes.root}>{children}</ListItem>;
  }
};

const TransactionsListItem: FC<TransactionsListItemProps> = ({
  transaction,
  secondaryAction,
  isButton = true
}) => {
  const timestamp = moment(transaction.timestamp);

  const classes = useStyles();

  return (
    <CoreListItem transaction={transaction} isButton={isButton}>
      <ListItemAvatar>
        <CategoryItemAvatar
          category={transaction.category}
          type={transaction.type}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className={classes.primary}>
            <Typography>{transaction.description}</Typography>
            {transaction.recurringDays ? (
              <Tooltip
                title={`This transaction recurs every ${transaction.recurringDays} days`}
                aria-label={`This transaction recurs every ${transaction.recurringDays} days`}
              >
                <div>
                  <RecurringIcon className={classes.recurringIcon} />
                  <sup
                    style={{ fontSize: "0.75rem" }}
                  >{`${transaction.recurringDays}d`}</sup>
                </div>
              </Tooltip>
            ) : null}
          </div>
        }
        secondary={<div>{timestamp.format("DD MMMM YYYY")}</div>}
        secondaryTypographyProps={{
          style: {
            fontSize: "0.75rem"
          }
        }}
        style={{ marginRight: "0.25rem" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MoneyTypography variant="body1" type={transaction.type}>
          {transaction.type === "income"
            ? `$${transaction.amount.toFixed(2)}`
            : `-$${transaction.amount.toFixed(2)}`}
        </MoneyTypography>

        <Typography variant="body2" color="textSecondary">
          {timestamp.format("hh:mmA")}
        </Typography>
      </div>
      {secondaryAction && secondaryAction}
    </CoreListItem>
  );
};

export default TransactionsListItem;
