import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Transaction } from '@crm/lib';

@Component({
  selector: 'crm-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnDestroy {
  newTransaction = new Subject<Transaction>();

  saveNewTransaction(tx: Transaction) {
    this.newTransaction.next(tx);
  }

  ngOnDestroy() {
    this.newTransaction.unsubscribe();
  }
}
