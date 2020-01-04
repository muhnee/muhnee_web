import firebase from "firebase";

export default interface SummaryCardProps {
  /**
   * The title of the summary card
   */
  title: string;

  /**
   * The actual amount to be displayed
   */
  amount?: number | string | JSX.Element | JSX.Element[];

  transactions?: firebase.firestore.QuerySnapshot;
}
