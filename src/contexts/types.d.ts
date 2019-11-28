import { User } from "firebase/app";

export interface AuthenticationContextState {
  /**
   * This value should be `true` once the initial loading of
   * the current authentication state has completed.
   */
  isLoaded: boolean;

  /**
   * The currently authenticated user if available.
   */
  user: Nullable<User>;
}
