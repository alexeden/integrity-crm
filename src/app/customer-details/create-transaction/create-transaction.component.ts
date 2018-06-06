import { Transaction } from '@crm/lib';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crm-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnChanges {
  readonly form: FormGroup;
  @Input() transaction: Partial<Transaction> = {};

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).createTransactionComponent = this;
    this.form = this.fb.group({
      amount: this.fb.control(0, [Validators.required]),
      type: ['payment'],
      timestamp: [new Date()],
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get value(): Transaction {
    const { value } = this.form;
    return {
      ...value,
      timestamp: value.timestamp instanceof Date ? value.timestamp.getTime() : Date.now(),
    };
  }

  ngOnChanges({ transaction: { currentValue } }: SimpleChanges) {
    if (!!currentValue) {
      this.form.patchValue({
        ...currentValue,
        timestamp: new Date(currentValue.timestamp || Date.now()),
      });
    }
  }
}
