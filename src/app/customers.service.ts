import { ConnectableObservable, from, Observable, BehaviorSubject } from 'rxjs';
import { publishReplay, concatMap, scan, map, filter, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

import { Customer, Id } from '@crm/lib';

@Injectable()
export class CustomersService {
  readonly customers: ConnectableObservable<Array<Id<Customer>>>;
  readonly selectedCustomer: Observable<Id<Customer>>;
  readonly customerCollection: AngularFirestoreCollection<Customer>;

  private readonly selectedCid$ = new BehaviorSubject<string | null>(null);

  constructor(
    private store: AngularFirestore
  ) {
    (window as any).customerService = this;
    this.customerCollection = this.store.collection<Customer>('customers');

    this.customers = this.customerCollection.stateChanges().pipe(
      concatMap(changes => from(changes)),
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

    this.selectedCustomer = this.selectedCid$.pipe(
      filter<string>(cid => typeof cid === 'string'),
      switchMap(cid =>
        this.customers.pipe(
          map(cs => cs.find(({ id }) => id === cid)),
          filter<Id<Customer>>(c => !!c)
        )
      )
    );

    this.customers.connect();
  }

  setSelectedCid(cid: string) {
    // this.customerCollection.doc(cid).ref.get()
    this.selectedCid$.next(cid);
  }
}
