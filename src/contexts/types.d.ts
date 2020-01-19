import { User } from "firebase/app";
import { firestore } from "firebase";
import moment from "moment";

export interface _Category {
  [id: string]: Category;
}
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
    income: _Category;
    expense: _Category;
  };
  isLoading: boolean;
}

export interface GlobalConfigState {
  maintenance: {
    enabled: boolean;
    scheduledEnd: moment.Moment | null;
    message: string;
  };
  isLoading: boolean;
}

type GlobalConfig = {
  maintenance: {
    enabled: boolean;
    scheduledEnd: firestore.Timestamp;
    message: string;
  };
};
