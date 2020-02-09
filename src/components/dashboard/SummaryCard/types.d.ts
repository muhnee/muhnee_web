import * as firebase from "firebase";
import { Transaction, TransactionTypes } from "../../../types/Transaction";

export default interface SummaryCardProps {
  /**
   * The title of the summary card
   */
  title: string;

  /**
   * Transactions SubHeading
   */
  transactionsTitle?: string;

  /**
   * The actual amount to be displayed
   */
  amount?: number | string | JSX.Element | JSX.Element[];

  transactions?: Transaction[];

  isLoading?: boolean;

  /**
   * The percentage
   */
  progress?: number;

  displayProgress?: boolean;

  /**
   * Should the card also show a line graph (Default: false)
   */
  showGraph?: boolean;

  /**
   * Type of Card
   */
  type?: TransactionTypes;
}
