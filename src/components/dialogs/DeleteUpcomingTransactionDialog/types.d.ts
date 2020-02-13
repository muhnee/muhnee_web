export default interface DeleteUpcomingTransactionDialogProps {
  /**
   * the id of the scheduled transaction
   */
  id: string;

  /**
   * is the dialog open
   */
  open: boolean;
  /**
   * on delete callback function
   */
  onClose: () => void;
}
