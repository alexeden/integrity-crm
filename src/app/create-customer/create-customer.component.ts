import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Customer, CustomerName, CustomerContact, CustomerAddress } from '@crm/lib';

@Component({
  selector: 'crm-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnDestroy {
  newCustomer = new Subject<Customer>();

  disabled = false;

  saveNewCustomer(
    name: CustomerName,
    contact: CustomerContact,
    address: CustomerAddress
  ) {
    this.newCustomer.next({
      name,
      contact,
      address,
      balance: 0,
      transactions: [],
      creationDate: Date.now(),
      updatedDate: Date.now(),
    });
  }

  ngOnDestroy() {
    this.newCustomer.unsubscribe();
  }
}
