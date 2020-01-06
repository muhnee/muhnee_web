import { variantIcon } from "../components/core/Snackbar/Snackbar";

export type Notification = {
  title?: string;
  message?: string;
  type: keyof typeof variantIcon;
};

export default Notification;
