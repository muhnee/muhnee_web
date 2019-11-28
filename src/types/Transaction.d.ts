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
  timestamp?: Date;
}
