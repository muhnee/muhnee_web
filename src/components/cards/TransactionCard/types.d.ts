import { Transaction } from "../../../types/Transaction";

export default interface TransactionCardProps {
  transaction: Transaction;

  key: number | string;

  month: string;

  transactionId: string;
}