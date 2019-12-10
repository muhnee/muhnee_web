import { Category } from "../../types/Category";
import { TransactionTypes } from "../../types/Transaction";

export default interface CategoriesListItemProps {
  /**
   * triggered when the remove button gets clicked
   */
  onRemove: (
    type: TransactionTypes,
    id: Category.id,
    name: Category.name
  ) => void;

  /**
   * The name of the category
   */
  category: Category;

  /**
   * The type of transcation
   */
  type: TransactionTypes;

  /**
   * What happens when clicking on the avatar
   */
  onAvatarClick?: (
    type: TransactionTypes,
    id: Category.id,
    name: Category.name
  ) => void;
}
