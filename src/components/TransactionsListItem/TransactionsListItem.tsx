import React, { FC } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MoneyTypography from "../core/MoneyTypography";

import TransactionsListItemProps from "./types";

import useStyles from "./styles";

const TransactionsListItem: FC<TransactionsListItemProps> = ({
  transaction
}) => {
  const timestamp = moment(transaction.timestamp.toDate());

  const classes = useStyles();
  const history = useHistory();
  return (
    <ListItem
      className={classes.root}
      onClick={() =>
        history.push(
          `/months/${timestamp.year()}-${timestamp.month() + 1}/transactions/${
            transaction.id
          }`
        )
      }
      button
    >
      <div style={{ flex: 1 }}>
        <ListItemText
          primary={transaction.description}
          secondary={timestamp.format("DD/MM/YYYY hh:mmA")}
          secondaryTypographyProps={{
            style: {
              fontSize: "0.75rem"
            }
          }}
        />
      </div>
      <MoneyTypography variant="body1" type={transaction.type}>
        {transaction.type === "income"
          ? `$${transaction.amount.toFixed(2)}`
          : `-$${transaction.amount.toFixed(2)}`}
      </MoneyTypography>
    </ListItem>
  );
};

export default TransactionsListItem;
