import { Moment } from "moment";
export interface MonthlySpendingByCategoryContainerProps {
  /**
   * month
   */
  date: Moment;

  /**
   *  Is the Table Displayed
   */
  showTable?: boolean;
}
