/* tslint:disable no-input-rename */
import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomersService } from '../customers.service';
import { CreateTransactionComponent } from './create-transaction.component';
import { tap, take, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Directive({
  selector: '[crmTransactionCreator]',
})
export class CreateTransactionDirective {
  constructor(
    private dialog: MatDialog,
    private notifier: MatSnackBar,
    public customerService: CustomersService
  ) {}

  @Input('crmTransactionCreator') cid: string = '';

  @HostListener('click')
  openCustomerCreator() {
    if (typeof this.cid !== 'string' || this.cid.length < 1) {
      throw new Error(`crmTransactionCreator required a string input to be used as a Customer ID!`);
    }
    console.log('opening customer creator');

    const dialogRef = this.dialog.open(CreateTransactionComponent);

    dialogRef.componentInstance.newTransaction.pipe(
      tap(() => dialogRef.componentInstance.disabled = true),
      take(1),
      switchMap(tx => from(this.customerService.createTransaction(this.cid, tx)))
    )
    .subscribe(({ type }) => {
      this.notifier.open(`✅ ${type} transaction created`);
      dialogRef.close();
    });
  }

}
