import firebase from "firebase";
import { Moment } from "moment";

export interface MonthSummaryContainerProps {
  /**
   * The current month of the graph to be displayed
   */
  currentMonth: Moment;

  /**
   *
   */
  transactions?: firebase.firestore.QuerySnapshot;

  /**
   * loading state
   */
  isLoading: boolean;
}
