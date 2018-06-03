import { CustomersService } from '../customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  constructor(
    public customerService: CustomersService
  ) {
    //
  }

  ngOnInit() {
    //
  }

}
