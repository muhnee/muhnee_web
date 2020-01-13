import * as firebase from "firebase";
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

export type Summary = {
  income: number;
  expenses: number;
  savingsGoal: number;
};

export type MonthlySummary = {
  [timestamp: string]: Summary;
};

export type MonthlySummaryItem = {
  date: moment.Moment;
  displayDate: string;
  expenses: number;
  income: number;
  label: string;
};

export type ChartTooltipItem = {
  color?: string;
  datekey?: string;
  fill?: string;
  formatter?: string;
  payload: MonthlySummaryItem;
  type?: string;
  unit?: string;
  value: number;
};

export interface ChartLabelProps {
  payload: ChartTooltipItem[];
  active: boolean;
}
