import { Transaction } from './types';

export type Id<T> = T & { id: string };

export interface CustomerAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: 'CAN' | 'USA'; // Limit support to Canada & US
}

export interface CustomerName {
  firstName: string;
  lastName: string;
}

export interface CustomerContact {
  email: string;
  phone: string;
}

export interface Customer {
  address: CustomerAddress;
  contact: CustomerContact;
  name: CustomerName;
  transactions: Transaction[];
  balance: number;
  creationDate: number;
  updatedDate: number;
}

export enum TransactionType {
  Charge = 'charge',
  Payment = 'payment',
}

export interface Transaction {
  type: TransactionType;
  timestamp: number;
  amount: number;
}
