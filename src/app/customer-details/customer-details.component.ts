import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'crm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  cid: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) {
    this.cid = this.route.paramMap.pipe(
      map(params => params.get('cid')),
      filter<string>(cid => cid !== null)
    );
    //
  }

  ngOnInit() {
    //
  }

}
