import { ConnectableObservable } from 'rxjs';
import { publishReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Customer, Id, FirebaseUtils, Transaction } from '@crm/lib';

@Injectable()
export class CustomersService {
  readonly customers: ConnectableObservable<Array<Id<Customer>>>;
  readonly customerCollection: AngularFirestoreCollection<Customer>;

  constructor(
    private store: AngularFirestore
  ) {
    (window as any).customerService = this;
    this.customerCollection = this.store.collection<Customer>('customers');

    this.customers = FirebaseUtils.collectionToData(this.customerCollection).pipe(
      publishReplay(1)
    ) as ConnectableObservable<Array<Id<Customer>>>;

    this.customers.connect();
  }

  createCustomer(customer: Customer): Promise<Id<Customer>> {
    console.log('creating customer!');
    return this.customerCollection
      .add(customer)
      .then(doc => ({ id: doc.id, ...customer }));
  }

  createTransaction(cid: string, tx: Transaction): Promise<Id<Transaction>> {
    const txid = this.store.createId();
    return this.updateTransaction(cid, tx, txid);
  }

  updateTransaction(cid: string, tx: Transaction, txid: string): Promise<Id<Transaction>> {
    return this.customerCollection
      .doc<Transaction>(`${cid}/transactions/${txid}`)
      .set(tx, { merge: true })
      .then(() => ({ id: txid, ...tx }));
  }

  deleteTransaction(cid: string, txid: string): Promise<string> {
    return this.customerCollection
      .doc(`${cid}/transactions/${txid}`)
      .delete()
      .then(() => txid);
  }
}
