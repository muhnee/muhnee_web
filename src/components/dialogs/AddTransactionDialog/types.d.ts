export default interface AddTransactionDialogProps {
  /**
   * Wether or not the modal is open (displayed to the user)
   */
  open?: boolean;

  /**
   * Callback to trigger when closing the modal
   */
  onClose?: () => void;
}
