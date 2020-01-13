import * as firebase from "firebase";

export interface UserAvatarMenuProps {
  user: firebase.User;

  /**
   * Should the Avatar Menu display the User's Name on the left of the avatar
   */
  displayName?: boolean;
}
