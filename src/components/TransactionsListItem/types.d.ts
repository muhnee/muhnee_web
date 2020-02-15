import { Transaction } from "../../types/Transaction";

export default interface TransactionsListItemProps {
  transaction: Transaction;
  secondaryAction?: JSX.Element | JSX.Element[];
  isButton?: true | false;
}
