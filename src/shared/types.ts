export interface Customer {
  firstName: string;
  lastName: string;
  payments: Payment[];
}

export interface Payment {
  date: string;
  amount: number;
}
