import React, { FC, useEffect, useState } from "react";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import { red } from "@material-ui/core/colors";

import DeleteIcon from "@material-ui/icons/Delete";

import TransactionsListItem from "../../components/TransactionsListItem";
import DeleteUpcomingTransactionDialog from "../../components/dialogs/DeleteUpcomingTransactionDialog";

import LoadingContainer from "../../containers/LoadingContainer";

import { useFunctions } from "../../firebase/firebase";

import { QueueItemResponse } from "../../types";
import { Transaction } from "../../types/Transaction";

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
  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const getUserScheduledTransactions = functions.httpsCallable(
        "getUserScheduledTransactions"
      );
      const res = await getUserScheduledTransactions();
      const queue: QueueItemResponse[] = [];
      console.log(res);
      res.data.slice(0, 6).forEach((item: any) => {
        const { transaction, id, timestamp } = item;
        const trans: Transaction = {
          id: transaction.id,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          taxDeductible: transaction.deductible,
          recurringDays: transaction.recurringDays,
          type: transaction.type,
          timestamp: transaction.timestamp
        };
        const queueItem: QueueItemResponse = {
          id,
          timestamp,
          transaction: trans
        };
        queue.push(queueItem);
      });

      console.log(queue);
      const a = queue.reduce((accumulator: SortedList, currentValue) => {
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
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="h5">Upcoming Transactions</Typography>
        {isLoading && <LoadingContainer />}
        {!isLoading && queue.length > 0 && (
          <List>
            {queue.map((queueItem, key) => {
              return (
                <React.Fragment key={key}>
                  <Typography>
                    {queueItem.date.format("DD MMM YYYY")}
                  </Typography>
                  <List>
                    {queueItem.items.map((item, i) => {
                      console.log(item.transaction);
                      return (
                        <TransactionsListItem
                          transaction={item.transaction}
                          secondaryAction={
                            <IconButton
                              style={{ color: red[300], marginLeft: "0.5rem" }}
                              onClick={() => {
                                if (item.id) {
                                  setSelectedTransactionId(item.id);
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          isButton={false}
                          key={i}
                        />
                      );
                    })}
                  </List>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </div>
      <DeleteUpcomingTransactionDialog
        id={selectedTransactionId}
        open={Boolean(selectedTransactionId)}
        onClose={() => {
          setSelectedTransactionId("");
        }}
      />
    </React.Fragment>
  );
};

export default UpcomingTransactionsPage;
