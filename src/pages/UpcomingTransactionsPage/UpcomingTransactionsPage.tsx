import React, { FC, useEffect, useState } from "react";
import moment from "moment";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { red } from "@material-ui/core/colors";

import DeleteIcon from "@material-ui/icons/Delete";

import LoadingContainer from "../../containers/LoadingContainer";

import { useFunctions } from "../../firebase/firebase";

import { FunctionsResponse, QueueItemResponse } from "../../types";

import useStyles from "./styles";

type SortedList = {
  [timestamp: string]: QueueItemResponse[];
};

type DateListItem = {
  date: moment.Moment;
  items: QueueItemResponse[];
};

const UpcomingTransactionsPage: FC = () => {
  const classes = useStyles();
  const functions = useFunctions();

  const [queue, setQueue] = useState<DateListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const getUserScheduledTransactions = functions.httpsCallable(
        "getUserScheduledTransactions"
      );
      const res: FunctionsResponse<QueueItemResponse[]> = await getUserScheduledTransactions();
      const data: QueueItemResponse[] = res.data;
      const a = data.reduce((accumulator: SortedList, currentValue) => {
        const key = moment(currentValue.timestamp)
          .startOf("d")
          .toISOString();
        if (accumulator[key]) {
          accumulator[key].push(currentValue);
        } else {
          accumulator[key] = [currentValue];
        }
        return accumulator;
      }, {});
      const sortedList: DateListItem[] = Object.keys(a)
        .map(key => {
          return {
            date: moment(key),
            items: a[key]
          };
        })
        .sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        });
      setQueue(sortedList);
      setIsLoading(false);
    }
    getData();
  }, [functions]);

  return (
    <div className={classes.root}>
      <Typography variant="h5">Upcoming Transactions</Typography>
      {isLoading && <LoadingContainer />}
      {!isLoading && queue.length > 0 && (
        <List>
          {queue.map((queueItem, key) => {
            return (
              <React.Fragment key={key}>
                <Typography>{queueItem.date.format("DD MMM YYYY")}</Typography>
                {queueItem.items.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ListItem
                        style={{ backgroundColor: "#CDCDCD", color: "#777" }}
                      >
                        <ListItemText
                          primary={`${
                            item.transaction.type === "income"
                              ? "Income"
                              : "Expense"
                          } - ${moment(item.timestamp).format(
                            "DD-MMM-YYYY hh:mm a"
                          )}`}
                          primaryTypographyProps={{ variant: "body2" }}
                          secondary={
                            <>
                              <Typography>
                                {`${item.transaction.description}`}
                              </Typography>
                              <Typography variant="body2">
                                {`This
                                transaction occurs every ${item.transaction.recurringDays} day(s)`}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton style={{ color: red[300] }}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default UpcomingTransactionsPage;
