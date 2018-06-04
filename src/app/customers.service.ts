import { ConnectableObservable, Observable, BehaviorSubject } from 'rxjs';
import { publishReplay, map, filter, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Customer, Id, FirebaseUtils } from '@crm/lib';

@Injectable()
export class CustomersService {
  readonly customers: ConnectableObservable<Array<Id<Customer>>>;
  readonly selectedCustomer: Observable<Id<Customer>>;
  readonly selectedCustomerId: Observable<string>;
  readonly customerCollection: AngularFirestoreCollection<Customer>;

  private readonly selectedCid$ = new BehaviorSubject<string | null>(null);

  constructor(
    private store: AngularFirestore
  ) {
    (window as any).customerService = this;
    this.customerCollection = this.store.collection<Customer>('customers');

    this.customers = FirebaseUtils.collectionToData(this.customerCollection).pipe(
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

    this.selectedCustomerId = this.selectedCustomer.pipe(map(c => c.id));

    this.customers.connect();
  }

  setSelectedCid(cid: string) {
    // this.customerCollection.doc(cid).ref.get()
    this.selectedCid$.next(cid);
  }
}
