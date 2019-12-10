import { Category } from "../../types/Category";

export interface CategoryIconAvatarProps {
  /**
   * function to be called when the user clicks the avatar
   */

  onClick?: () => void;

  /**
   * category id
   */
  category?: Category;
}
