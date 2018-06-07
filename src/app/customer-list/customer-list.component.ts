import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  constructor(
    public customerService: CustomersService
  ) {}
}
