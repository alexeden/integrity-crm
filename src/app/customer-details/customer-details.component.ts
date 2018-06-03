import { Id, Customer } from '@crm/lib';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'crm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  cid: Observable<string>;
  details: Observable<Id<Customer>>;


  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService
  ) {
    this.cid = this.route.paramMap.pipe(
      map(params => params.get('cid')),
      filter<string>(cid => cid !== null)
    );

    this.details = this.cid.pipe(
      switchMap(cid => this.customerService.customerById(cid))
    );
  }

  ngOnInit() {
    //
  }

}
