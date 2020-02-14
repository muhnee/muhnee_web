import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import TransactionsListItem from "../../components/TransactionsListItem";

import LoadingContainer from "../../containers/LoadingContainer";

import AddIcon from "@material-ui/icons/AddBox";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useUIDispatch } from "../../contexts/UIProvider";
import { Summary } from "../../types/Summary";

import useStyles from "./styles";
import { useFirestore, useFunctions } from "../../firebase/firebase";
import { Transaction } from "../../types/Transaction";

import SummaryTitle from "../../components/dashboard/SummaryTitle";

const DashboardPage: FC = () => {
  const uiDispatch = useUIDispatch();
  const firestore = useFirestore();
  const functions = useFunctions();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const thisMonth = moment();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);

  const classes = useStyles();

  const targetDate = `${thisMonth.year()}-${thisMonth.month() + 1}`;

  useEffect(() => {
    async function getData() {
      const getAllTransactions = functions.httpsCallable("getAllTransactions");
      setIsTransactionsLoading(true);
      const res = await getAllTransactions({
        date: thisMonth.toISOString(),
        summaryType: "week"
      });

      const transactions: Transaction[] = [];
      res.data.forEach((trans: any) => {
        const transaction: Transaction = {
          id: trans.id,
          amount: trans.amount,
          description: trans.description,
          category: trans.category,
          taxDeductible: trans.deductible,
          recurringDays: trans.recurringDays,
          type: trans.type,
          timestamp: trans.timestamp
        };
        transactions.push(transaction);
      });
      setTransactions(transactions);
      setIsTransactionsLoading(false);
    }
    getData();
  }, [functions]);

  const [summary] = useDocumentData<Summary>(
    user
      ? firestore
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(targetDate)
      : null
  );

  if (!user || !user.displayName) {
    return <p>An Error Occurred.</p>;
  }

  let currentSavings = 0;
  if (summary && summary.savingsGoal) {
    currentSavings = (summary.income || 0) - (summary.expenses || 0);
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">
            <strong>Hello,</strong>{" "}
            <span className={classes.monthTitle}>{`${user.displayName}`}</span>
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.row} style={{ flex: 2 }}>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <SummaryTitle
              title="Monthly Savings Goal"
              value={summary ? `$${summary.savingsGoal.toFixed(2)}` : "N/A"}
            />
            <SummaryTitle
              title="Savings this month"
              value={`$${currentSavings.toFixed(2)}` || "N/A"}
            />
            <SummaryTitle
              title="Income this month"
              value={summary ? `$${summary.income.toFixed(2)}` : "N/A"}
            />
            <SummaryTitle
              title="Expenses this month"
              value={summary ? `$${summary.expenses.toFixed(2)}` : "N/A"}
            />
          </div>
          <div>
            <Typography>This component is under construction </Typography>
          </div>
        </div>
        <div className={classes.row} style={{ flex: 1 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Transactions this week
          </Typography>
          {isTransactionsLoading ? (
            <LoadingContainer />
          ) : (
            <div>
              <List>
                {transactions.map((transaction, i) => {
                  return (
                    <TransactionsListItem transaction={transaction} key={i} />
                  );
                })}
              </List>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body2">
                  <Link href={`/months/${targetDate}`}>
                    See All Transactions >>
                  </Link>
                </Typography>
              </div>
            </div>
          )}
        </div>
      </div>
      <Fab
        variant="extended"
        className={classes.fab}
        color="primary"
        onClick={() =>
          uiDispatch({
            type: "@@UI/ADD_TRANSACTION_MODAL_OPEN",
            date: thisMonth
          })
        }
      >
        <AddIcon className={classes.extendedIcon} />
        Add Transaction
      </Fab>
    </div>
  );
};

export default DashboardPage;
