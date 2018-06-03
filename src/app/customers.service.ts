import { ConnectableObservable, from, Observable } from 'rxjs';
import { publishReplay, exhaustMap, scan, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

import { Customer, Id } from '@crm/lib';

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
          const data = change.payload.doc.data();
          const newC = { id, ...data };
          switch (change.type) {
            case 'added': return [ ...cs, newC ];
            case 'removed': return cs.filter(c => c.id !== id);
            case 'modified': return cs.map(c => c.id === id ? newC : c);
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

  customerById(cid: string): Observable<Id<Customer>> {
    return this.customers.pipe(
      map(cs => cs.find(({ id }) => id === cid)),
      filter<Id<Customer>>(c => !!c)
    );
  }
}
