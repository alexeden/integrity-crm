import { ConnectableObservable } from 'rxjs';
import { publishReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Customer } from '@crm/shared';

@Injectable()
export class CustomersService {
  private customerCollection: AngularFirestoreCollection<Customer>;
  customers: ConnectableObservable<Customer[]>;

  constructor(
    private store: AngularFirestore
  ) {
    (window as any).customerService = this;
    this.customerCollection = this.store.collection<Customer>('customers');
    this.customers = this.customerCollection.valueChanges().pipe(
      publishReplay(1)
    ) as ConnectableObservable<Customer[]>;

    this.customers.connect();
  }
}
