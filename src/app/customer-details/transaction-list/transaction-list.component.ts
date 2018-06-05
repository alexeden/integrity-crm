import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { tag } from '@crm/shared';
import { Transaction, Customer } from '@crm/lib';
import { CustomersService } from '../../customers.service';

@Component({
  selector: 'crm-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() readonly cid: string = '';
  private readonly cid$ = new BehaviorSubject<string | null>(null);
  readonly transactionCollection: Observable<AngularFirestoreCollection<Transaction>>;
  readonly transactions: Observable<Transaction[]>;
  readonly noTransactions: Observable<boolean>;
  private readonly unsubscribe = new Subject<any>();


  constructor(
    private customerService: CustomersService
  ) {

    // this.transactionService.activeTransactions;
    this.transactionCollection = this.cid$.pipe(
      filter<string>(cid => typeof cid === 'string'),
      map(cid => this.customerService.customerCollection.doc(cid).collection<Transaction>('transactions')),
      tag('transaction collection')
    );



    this.transactions = this.transactionCollection.pipe(
      switchMap(collection => collection.valueChanges())
    );

    this.noTransactions = this.transactions.pipe(map(ps => ps.length < 1));

  }

  ngOnChanges(changes: SimpleChanges) {
    // this.transactionCollection$.next(changes.transactionCollection.currentValue);
    // console.log('TransactionListComponent changes: ', changes);
    this.cid$.next(changes.cid.currentValue);
  }

  ngOnInit() {
    //
  }

  ngOnDestroy() {
    console.log(`TransactionListComponent is being DESTROYED`);
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }

}
