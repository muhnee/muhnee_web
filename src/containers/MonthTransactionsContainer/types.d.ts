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

  /**
   * should display the `AddTransactionModal`
   */
  shouldDisplayAddTransactionModal?: boolean;

  /**
   * the open or close state of the `AddTransactionModal`
   */
  isAddTransactionModalOpen?: boolean;

  /**
   * The Call Back for the `AddTransactionModal` when onClose() is called
   */
  onAddTransactionModalClose?: () => void;
}
