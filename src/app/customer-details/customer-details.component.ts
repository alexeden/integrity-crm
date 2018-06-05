import { Customer, Transaction } from '@crm/lib';
import { tag } from '@crm/shared';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


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

  private readonly unsubscribe = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService
  ) {
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
      tag('customer document value'),
      filter<Customer>(c => !!c)
    );
  }

  ngOnInit() {
    console.log(`CustomerDetailsComponent is INIT`);
    //
  }

  ngOnDestroy() {
    console.log(`CustomerDetailsComponent is being DESTROYED`);
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }

}
