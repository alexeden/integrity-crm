import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { CreateCustomerComponent } from '@crm/app/create-customer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public customerService: CustomersService
  ) {
    //
  }

  ngOnInit() {
    //
  }

  createNewCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent);

    dialogRef.componentInstance.newCustomer
      .pipe(take(1))
      .subscribe(async customer => {
        await this.customerService.createCustomer(customer);
        dialogRef.close();
      });
  }
}
