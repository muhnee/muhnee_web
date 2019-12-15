export interface MonthlySummaryCardProps {
  /**
   * If the data is loading
   */
  isLoading: boolean;

  /**
   * If data being fetch has errored
   */
  hasErrored: boolean;

  /**
   * The heading
   */
  title: string;

  /**
   * The value
   */
  value: string;

  /**
   * secondary action
   */
  secondaryAction?: JSX.Element | JSX.Element[];
}
