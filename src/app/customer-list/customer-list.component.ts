import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerComponent } from '@crm/app/create-customer';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private notifier: MatSnackBar,
    public customerService: CustomersService
  ) {}

  createNewCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent);

    dialogRef.componentInstance.newCustomer.pipe(
      take(1),
      switchMap(c => from(this.customerService.createCustomer(c)))
    )
    .subscribe(async ({ name, id }) => {
      this.notifier.open(`✅ ${name.firstName} ${name.lastName} was added as a customer`);
      dialogRef.close();
      // Ideally the magic number tab index of 3 would be stored in a constant somewhere
      this.router.navigate(['customers', id], {queryParams: {tab: 3}});
    });
  }
}
