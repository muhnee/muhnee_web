export interface Transaction {
  /**
   * The category of transaction
   */
  category?: string;

  /**
   * The amount of the transaction
   */
  amount?: number;

  /**
   * The Description of the transaction
   */
  description?: string;

  /**
   * Timestamp
   */
  timestamp?: firebase.firestore.Timestamp;

  /**
   * Whether or not the item is tax deductable
   */
  taxDeductible: boolean;

  /**
   * The type of transaction
   */
  type: "expense" | "income";
}
