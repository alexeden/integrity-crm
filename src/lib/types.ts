import { Transaction } from './types';

export type Id<T> = T & { id: string };

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: 'CAN' | 'USA'; // Limit support to Canada & US
}

export interface Customer {
  address: Address;
  balance: number;
  creationDate: number;
  firstName: string;
  lastName: string;
  phone: number;
  transactions: Transaction[];
  updatedDate: number;
}

export enum TransactionType {
  Expense = 'expense',
  Payment = 'payment',
}

export interface Transaction {
  type: TransactionType;
  timestamp: number;
  amount: number;
}
