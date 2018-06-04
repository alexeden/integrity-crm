import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Transaction } from '@crm/lib';

@Component({
  selector: 'crm-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() readonly cid: string;

  private readonly cid$ = new BehaviorSubject<string | null>(null);
  readonly transactions: Observable<Transaction[]>;
  readonly noTransactions: Observable<boolean>;

  constructor(
    private store: AngularFirestore
  ) {
    this.transactions = this.cid$.pipe(
      filter<string>(cid => cid !== null),
      switchMap(cid => {
        return this.store.collection<Transaction>(`customers/${cid}/transactions`).valueChanges();
      })
    );

    this.noTransactions = this.transactions.pipe(map(ps => ps.length < 1));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cid$.next(changes.cid.currentValue);
  }

  ngOnInit() {
    //
  }

}
