import { Observable } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { CustomersService } from './customers.service';
// import { ConnectableObservable, from, Observable, BehaviorSubject } from 'rxjs';
// import { publishReplay, concatMap, scan, map, filter, switchMap } from 'rxjs/operators';
// import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

import { Transaction, FirebaseUtils } from '@crm/lib';

@Injectable()
export class TransactionsService {
  readonly transactionCollection: Observable<AngularFirestoreCollection<Transaction>>;
  readonly activeTransactions: Observable<Transaction[]>;

  constructor(
    private customerService: CustomersService
  ) {
    (window as any).transactionService = this;
    this.transactionCollection = this.customerService.selectedCustomerId.pipe(
      map(cid =>
        this.customerService.customerCollection
          .doc(cid)
          .collection<Transaction>('transactions')
      )
    );

    this.activeTransactions = this.transactionCollection.pipe(
      switchMap(FirebaseUtils.collectionToData),
      startWith([])
    );
  }


}
