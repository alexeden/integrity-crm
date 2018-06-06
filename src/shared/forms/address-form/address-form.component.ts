import { Subject } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as STATES from './states.json';
import { CustomerAddress } from '@crm/lib';
import { filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'crm-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: Partial<CustomerAddress> = {};
  @Output() changed = new Subject<CustomerAddress>();

  readonly form: FormGroup;
  private readonly unsubscribe = new Subject<any>();
  readonly stateGroups = STATES.groups; // Ideally this would be injected via value provider

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).addressFormComponent = this;
    this.form = this.fb.group({
      addressLine1: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      addressLine2: null,
      city: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      state: this.fb.control(null, [Validators.required]),
      zip: this.fb.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      country: this.fb.control('USA', [Validators.required]),
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

  get value(): CustomerAddress {
    return this.form.value;
  }

  ngOnChanges({ model: { currentValue } }: SimpleChanges) {
    if (!!currentValue) {
      this.form.patchValue(currentValue);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }
}
