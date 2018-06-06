import { Subject } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerContact } from '@crm/lib';
import { filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'crm-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: Partial<CustomerContact> = {};
  @Input() disabled = false;
  @Output() changed = new Subject<CustomerContact>();

  readonly form: FormGroup;
  private readonly unsubscribe = new Subject<any>();

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).contactFormComponent = this;
    this.form = this.fb.group({
      phone: this.fb.control(null, [Validators.required, Validators.minLength(10)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
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

  get value(): CustomerContact {
    return this.form.value;
  }

  ngOnChanges({ model, disabled }: SimpleChanges) {
    if (!!model && !!model.currentValue) {
      this.form.patchValue(model.currentValue);
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
