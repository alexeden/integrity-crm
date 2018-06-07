import { Subject } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Transaction } from '@crm/lib';
import { filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'crm-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: Partial<Transaction> = {};
  @Input() disabled = false;
  @Output() changed = new Subject<Transaction>();

  readonly form: FormGroup;
  private readonly unsubscribe = new Subject<any>();

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).transactionFormComponent = this;
    this.form = this.fb.group({
      amount: this.fb.control(0, [
        Validators.required,
        control => typeof control.value === 'number' && control.value > 0
          ? null
          : { invalidAmount: 'Must be a number greater than zero' },
      ]),
      type: ['payment'],
      timestamp: [new Date()],
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      filter(() => this.form.valid),
      map(() => this.value)
    )
    .subscribe(this.changed);
  }

  get value(): Transaction {
    const { value } = this.form;
    return {
      ...value,
      timestamp: value.timestamp instanceof Date ? value.timestamp.getTime() : Date.now(),
    };
  }

  ngOnChanges({ model, disabled }: SimpleChanges) {
    if (!!model && !!model.currentValue) {
      this.form.patchValue({
        ...model.currentValue,
        timestamp: new Date(model.currentValue.timestamp || Date.now()),
      });
    }
    if (!!disabled && typeof disabled.currentValue === 'boolean') {
      this.form[disabled.currentValue ? 'disable' : 'enable']();
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }
}
