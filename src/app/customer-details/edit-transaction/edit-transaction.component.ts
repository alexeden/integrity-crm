import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'crm-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent implements OnInit {
  readonly form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).editTransactionComponent = this;
    this.form = this.fb.group({
      amount: [0],
      type: ['payment'],
      timestamp: [new Date()],
    });
  }

  ngOnInit() {
    //
  }

}
