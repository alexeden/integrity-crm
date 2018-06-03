import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'crm-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @Input() readonly cid: string;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

}
