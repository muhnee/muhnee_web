import { JSXElement } from "@babel/types";

export default interface SummaryCardProps {
  /**
   * The title of the summary card
   */
  title: string;

  /**
   * The actual amount
   */
  amount: string | number;

  /**
   * Is the inverted
   */
  inverted?: boolean;

  /**
   * Avatar
   */
  avatar?: JSX.Element;
}
