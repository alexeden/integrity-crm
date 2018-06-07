import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerComponent } from './create-customer.component';
import { CustomersService } from '../customers.service';

@Directive({
  selector: '[crmCustomerCreator]',
})
export class CreateCustomerDirective {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private notifier: MatSnackBar,
    public customerService: CustomersService
  ) {}

  @HostListener('click')
  openCustomerCreator() {
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
