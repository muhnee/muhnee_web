import { variantIcon } from "./Snackbar";

export interface SnackbarProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}
