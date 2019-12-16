import { Moment } from "moment";

export interface UpdateMonthlyGoalDialogProps {
  /**
   * is the dialog open
   */
  open: boolean;

  /**
   * Date
   */
  date: Moment;

  onClose?: () => void;
}
