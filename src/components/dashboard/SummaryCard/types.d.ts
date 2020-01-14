import * as firebase from "firebase";

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

  transactions?: firebase.firestore.QuerySnapshot;

  isLoading?: boolean;

  /**
   * The percentage
   */
  progress?: number;

  displayProgress?: boolean;
}
