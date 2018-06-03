import { ConnectableObservable, from } from 'rxjs';
import { publishReplay, exhaustMap, scan } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

import { Customer, Id } from '@crm/shared';

@Injectable()
export class CustomersService {
  private customerCollection: AngularFirestoreCollection<Customer>;
  customers: ConnectableObservable<Array<Id<Customer>>>;

  constructor(
    private store: AngularFirestore
  ) {
    (window as any).customerService = this;
    this.customerCollection = this.store.collection<Customer>('customers');
    this.customers = this.customerCollection.stateChanges().pipe(
      exhaustMap(changes => from(changes)),
      scan<DocumentChangeAction<Customer>, Array<Id<Customer>>>(
        (cs, change) => {
          const id = change.payload.doc.id;
          switch (change.type) {
            case 'added':
              return [ ...cs, { id, ...change.payload.doc.data() } ];
            case 'removed':
              return cs.filter(c => c.id !== id);
            case 'modified':
              return cs.map(c =>
                c.id === id
                ? { id, ...change.payload.doc.data() }
                : c
              );
          }
        },
        []
      ),
      publishReplay(1)
    ) as ConnectableObservable<Array<Id<Customer>>>;
    // this.customerCollection.valueChanges().pipe(
    // ) as ConnectableObservable<Customer[]>;

    this.customers.connect();
  }
}
