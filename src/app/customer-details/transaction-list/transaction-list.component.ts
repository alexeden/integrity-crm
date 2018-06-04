import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '@crm/lib';
import { TransactionsService } from '../../transactions.service';

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
    private transactionService: TransactionsService
  ) {
    this.transactions = this.transactionService.activeTransactions;
    this.noTransactions = this.transactions.pipe(map(ps => ps.length < 1));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cid$.next(changes.cid.currentValue);
  }

  ngOnInit() {
    //
  }

}
