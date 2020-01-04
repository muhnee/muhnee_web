import React, { FC } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import SummaryCardProps from "./types";
import { Transaction } from "../../../types/Transaction";

import useStyles from "./styles";

const SummaryCard: FC<SummaryCardProps> = props => {
  const { title, amount, transactions } = props;
  const classes = useStyles(props);

  return (
    <Card
      style={{
        boxShadow: `
      0 1.4px 2.8px rgba(0, 0, 0, 0.143),
      0 3.3px 6.7px rgba(0, 0, 0, 0.199),
      0 6.1px 12.5px rgba(0, 0, 0, 0.231),
      0 10.9px 22.3px rgba(0, 0, 0, 0.256),
      0 20.5px 41.8px rgba(0, 0, 0, 0.285),
      0 49px 100px rgba(0, 0, 0, 0.34)
    `,
        marginBottom: "1rem",
        minWidth: 280
      }}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {amount}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <List>
          {transactions &&
            transactions.docs.map((doc, i) => {
              const docData = doc.data();

              const transaction: Transaction = {
                type: docData.type,
                amount: docData.amount,
                description: docData.description,
                category: docData.category,
                taxDeductible: docData.taxDeductible,
                timestamp: docData.timestamp
              };

              return (
                <ListItem key={i}>
                  <ListItemText primary={transaction.description} />
                </ListItem>
              );
            })}
        </List>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
