import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import Divider from "@material-ui/core/Divider";
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
import { FunctionsResponse } from "../../types";
import { UserStats } from "../../types/response/UserStats";
import { Transaction } from "../../types/Transaction";

import SummaryTitle from "../../components/dashboard/SummaryTitle";
import MonthlySpendingByCategoryContainer from "../../containers/MonthlySpendingByCategoryContainer";

const DashboardPage: FC = () => {
  const uiDispatch = useUIDispatch();
  const firestore = useFirestore();
  const functions = useFunctions();

  const { user } = useContext(AuthenticationContext);

  // TODO: add support for changing months on dashboard
  const thisMonth = moment();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);

  const [upcomingTransactions, setUpcomingTransactions] = useState(0);

  const classes = useStyles();

  const targetDate = `${thisMonth.year()}-${thisMonth.month() + 1}`;

  useEffect(() => {
    async function getData() {
      const getAllTransactions = functions.httpsCallable("getAllTransactions");
      const getUserStats = functions.httpsCallable("getUserStats");
      setIsTransactionsLoading(true);
      const res: FunctionsResponse<Transaction[]> = await getAllTransactions({
        date: thisMonth.toISOString(),
        summaryType: "week"
      });

      const transactions = res.data.slice(0, 6);

      const userStats: FunctionsResponse<UserStats> = await getUserStats();
      setUpcomingTransactions(userStats.data.queueSize as number);
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
      <div className={classes.row} style={{ flexDirection: "column" }}>
        <div className={classes.row}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              minWidth: 250,
              minHeight: 100,
              backgroundRepeat: "no-repeat",
              backgroundSize: "30%",
              backgroundImage: "url(/images/scheduled.svg)",
              backgroundPosition: "90% 90%",
              padding: "0.75rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Upcoming Transactions
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {isTransactionsLoading ? "Loading..." : upcomingTransactions}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                in the next week
              </Typography>
            </div>
            <Link href="/scheduled">
              <Typography variant="body2">View all</Typography>
            </Link>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.row}>
        <div className={classes.row} style={{ flex: 3 }}>
          <div className={classes.row}>
            <SummaryTitle
              title="Monthly Savings Goal"
              value={
                summary && summary.savingsGoal
                  ? `$${summary.savingsGoal.toFixed(2)}`
                  : "N/A"
              }
            />
            <SummaryTitle
              title="Savings this month"
              value={`$${currentSavings.toFixed(2)}` || "N/A"}
            />
            <SummaryTitle
              title="Income this month"
              value={
                summary && summary.income
                  ? `$${summary.income.toFixed(2)}`
                  : "N/A"
              }
            />
            <SummaryTitle
              title="Expenses this month"
              value={
                summary && summary.expenses
                  ? `$${summary.expenses.toFixed(2)}`
                  : "N/A"
              }
            />
          </div>
          <div
            className={classes.row}
            style={{ flexDirection: "column", flex: 1 }}
          >
            <Typography variant="body1" color="textSecondary">
              Spend by Category
            </Typography>
            <MonthlySpendingByCategoryContainer date={thisMonth} />
          </div>
        </div>
        <div
          className={classes.row}
          style={{
            flex: 2,
            marginLeft: "0.75rem",
            borderLeft: "1px solid #ccc",
            flexDirection: "column"
          }}
        >
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Transactions this week
          </Typography>
          {isTransactionsLoading ? (
            <LoadingContainer />
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <List style={{ flex: 1 }}>
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
