import { Subject } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerName } from '@crm/lib';
import { filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'crm-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})
export class NameFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: Partial<CustomerName> = {};
  @Input() disabled = false;
  @Output() changed = new Subject<CustomerName>();

  readonly form: FormGroup;
  private readonly unsubscribe = new Subject<any>();

  constructor(
    private fb: FormBuilder
  ) {
    (window as any).nameFormComponent = this;
    this.form = this.fb.group({
      firstName: this.fb.control(null, [Validators.required, Validators.minLength(1)]),
      lastName: this.fb.control(null, [Validators.required, Validators.minLength(1)]),
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

  ngOnChanges({ model, disabled }: SimpleChanges) {
    if (!!model && !!model.currentValue) {
      this.form.patchValue(model.currentValue);
    }
    if (!!disabled && typeof disabled.currentValue === 'boolean') {
      this.form[disabled.currentValue ? 'disable' : 'enable']();
    }
  }

  get value(): CustomerName {
    return this.form.value;
  }

  ngOnDestroy() {
    this.unsubscribe.next('Close all the streams');
    this.unsubscribe.unsubscribe();
  }
}
