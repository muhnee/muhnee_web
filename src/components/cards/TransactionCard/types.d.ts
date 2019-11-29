import { Transaction } from "../../../types/Transaction";

export default interface TransactionCardProps {
  transaction: Transaction;

  key: number;

  month: string;

  transactionId: string;
}
