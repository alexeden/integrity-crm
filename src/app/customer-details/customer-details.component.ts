import { Observable, Subject, BehaviorSubject, from } from 'rxjs';
import { map, filter, switchMap, takeUntil, tap, take, withLatestFrom, switchMapTo } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer, Transaction } from '@crm/lib';
import { tag } from '@crm/shared';
import { CreateTransactionComponent } from '@crm/app/create-transaction';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'crm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  cid: Observable<string>;
  customer: Observable<Customer>;
  customerDocument: Observable<AngularFirestoreDocument<Customer>>;
  transactionCollection: Observable<AngularFirestoreCollection<Transaction>>;
  fullName: Observable<string>;

  readonly selectedTabIndex = new BehaviorSubject<number>(0);
  readonly updating = new BehaviorSubject<boolean>(false);
  private readonly unsubscribe = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public customerService: CustomersService,
    private notifier: MatSnackBar
  ) {
    (window as any).customerDetailsComponent = this;
    this.cid = this.route.paramMap.pipe(
      map(params => params.get('cid')),
      filter<string>(cid => cid !== null)
    );

    this.customerDocument = this.cid.pipe(
      map(cid => this.customerService.customerCollection.doc<Customer>(cid))
    );

    this.transactionCollection = this.customerDocument.pipe(
      map(doc => doc.collection('transactions'))
    );

    this.customer = this.customerDocument.pipe(
      switchMap(doc => doc.valueChanges()),
      filter<Customer>(c => !!c)
    );

    this.fullName = this.customer.pipe(
      map(({ name }) => `${name.firstName} ${name.lastName}`)
    );
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      takeUntil(this.unsubscribe),
      map(query => +(query.get('tab') || 0))
    )
    .subscribe(this.selectedTabIndex);
  }

  createTransaction() {
    const cid = this.route.snapshot.paramMap.get('cid')!;
    const dialogRef = this.dialog.open(CreateTransactionComponent);

    dialogRef.componentInstance.newTransaction.pipe(
      tap(() => dialogRef.componentInstance.disabled = true),
      take(1),
      switchMap(tx => from(this.customerService.createTransaction(cid, tx)))
    )
    .subscribe(({ type }) => {
      dialogRef.close();
      this.notifier.open(`✅ ${type} transaction created`);
    });
  }

  updateCustomer<K extends keyof Customer>(prop: K, value: Customer[K]) {
    this.customerDocument.pipe(
      take(1),
      tap(() => this.updating.next(true)),
      switchMap(doc => from(doc.update({ [prop]: value }))),
      switchMapTo(this.fullName),
      tap(() => this.updating.next(false))
    )
    .subscribe(name => {
      this.notifier.open(`✅ ${name}'s information updated`);
    });
  }

  tabChanged(event: MatTabChangeEvent) {
    this.router.navigate([], {
      queryParams: { tab: event.index },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }
}
