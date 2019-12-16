export interface Summary {
  /**
   * the year
   */
  year?: number;

  /**
   * the month
   */
  month?: number;

  /**
   * total expenses for that month
   */
  expenses: number;

  /**
   * total income for that month
   */
  income: number;

  savingsGoal: number;
}
