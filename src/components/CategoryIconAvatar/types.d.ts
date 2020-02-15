import { Category } from "../../types/Category";
import { TransactionTypes } from "../../types/Transaction";

export interface CategoryIconAvatarProps {
  /**
   * function to be called when the user clicks the avatar
   */

  onClick?: () => void;

  /**
   * category id
   */
  category: Category;
  /**
   * The type of transcation
   */
  type: TransactionTypes;
}
