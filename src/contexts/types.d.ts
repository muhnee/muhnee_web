import { User } from "firebase/app";
import { firestore } from "firebase";

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

export interface CategoriesContextState {
  incomeCategories: firestore.QuerySnapshot | null | undefined;
  expenseCategories: firestore.QuerySnapshot | null | undefined;
  categoryMap: {
    income: any;
    expense: any;
  };
}
