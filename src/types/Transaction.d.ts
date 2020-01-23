export type TransactionTypes = "expense" | "income";

export interface Transaction {
  /**
   * The category of transaction
   * the category is a UID to the doc found in the collection
   * `/users/{uid}/categories/{type}/types/`
   */
  category: string;

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
   */
  timestamp: firebase.firestore.Timestamp;

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
   * Does the transaction repeat itself
   */
  isRecurring?: boolean;
}
