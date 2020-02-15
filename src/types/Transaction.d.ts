export type TransactionTypes = "expense" | "income";

export type RecurringDays = 0 | 1 | 2 | 5 | 7 | 14 | 21 | 28 | 32;

export interface Transaction {
  /**
   * The category of transaction
   * the category is a UID to the doc found in the collection
   * `/users/{uid}/categories/{type}/types/`
   */
  category: string | Category;

  /**
   * The amount of the transaction
   */
  amount: number;

  /**
   * The Description of the transaction
   */
  description?: string;

  /**
   * Timestamp
   * ISO String
   */
  timestamp: string;

  /**
   * Whether or not the item is tax deductable
   */
  taxDeductible: boolean;

  /**
   * The type of transaction
   */
  type: TransactionTypes;

  /**
   * The Firestore Storage Link to the Upload
   */
  receipt?: string | null;

  /**
   * Firestore ID (used in some places)
   */
  id?: string;

  /**
   * How many days does the transaction repeat itself
   */
  recurringDays?: RecurringDays;
}
