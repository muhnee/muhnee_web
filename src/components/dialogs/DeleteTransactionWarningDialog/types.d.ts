export default interface DeleteTransactionWarningDialogProps {
  open: boolean;

  onClose: () => void;

  onDeleteTransaction: () => void;
}
