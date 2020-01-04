import { Moment } from "moment";
import firebase from "firebase";

export interface MonthTransactionsContainerProps {
  /**
   * the month that the transaction is in
   */
  month: Moment;

  /**
   * the maximum amount of transactions to display (defaults to size of array)
   */
  maxTransactions?: number;
}
