import { variantIcon } from "../components/Snackbar/Snackbar";

export type Notification = {
  title?: string;
  message?: string;
  type: keyof typeof variantIcon;
};

export default Notification;
