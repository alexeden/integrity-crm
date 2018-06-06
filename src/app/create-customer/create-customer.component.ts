import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Customer } from '@crm/lib';

@Component({
  selector: 'crm-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnDestroy {
  newCustomer = new Subject<Customer>();

  saveNewCustomer(tx: Customer) {
    this.newCustomer.next(tx);
  }

  ngOnDestroy() {
    this.newCustomer.unsubscribe();
  }
}
