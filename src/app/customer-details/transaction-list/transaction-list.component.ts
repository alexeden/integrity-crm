import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction, FirebaseUtils, Id } from '@crm/lib';
import { CustomersService } from '../../customers.service';

@Component({
  selector: 'crm-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnChanges, OnDestroy {
  @Input() readonly cid: string = '';
  private readonly cid$ = new BehaviorSubject<string | null>(null);
  readonly transactionCollection: Observable<AngularFirestoreCollection<Transaction>>;
  readonly transactions: Observable<Array<Id<Transaction>>>;
  readonly noTransactions: Observable<boolean>;
  private readonly unsubscribe = new Subject<any>();

  constructor(
    private customerService: CustomersService,
    private notifier: MatSnackBar
  ) {
    this.transactionCollection = this.cid$.pipe(
      filter<string>(cid => typeof cid === 'string'),
      map(cid => this.customerService.customerCollection.doc(cid).collection<Transaction>('transactions'))
    );

    this.transactions = this.transactionCollection.pipe(
      switchMap(FirebaseUtils.collectionToData)
    );

    this.noTransactions = this.transactions.pipe(map(ps => ps.length < 1));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cid$.next(changes.cid.currentValue);
  }

  async updateTransaction(txid: string, tx: Transaction) {
    await this.customerService.updateTransaction(this.cid, tx, txid);
    this.notifier.open(`✅ Transaction updated`);
  }

  async addTransaction(tx: Transaction) {
    await this.customerService.createTransaction(this.cid, tx);
    this.notifier.open(`✅ Transaction created`);
  }

  async deleteTransaction(txid: string) {
    await this.customerService.deleteTransaction(this.cid, txid);
    this.notifier.open(`❎ Transaction deleted`);
  }

  ngOnDestroy() {
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }

}
