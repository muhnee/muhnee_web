import { Transaction } from "../../../types/Transaction";

export default interface TransactionCardProps {
  transaction: Transaction;

  month?: string;

  transactionId: string;
}
