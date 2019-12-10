import { _Category } from "../../contexts/types";
import { Category } from "../../types/Category";

export default interface CategoriesListItemProps {
  /**
   * triggered when the remove button gets clicked
   */
  onRemove: () => void;

  /**
   * The name of the category
   */
  category: Category;
}
