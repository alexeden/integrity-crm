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

  updateTransaction(cid: string, tx: Transaction, unsafeTxid?: string) {
    const txid = typeof unsafeTxid === 'string' ? unsafeTxid : this.store.createId();

    return this.customerCollection
      .doc<Transaction>(`${cid}/transactions/${txid}`)
      .set(tx, { merge: true });
  }
}
