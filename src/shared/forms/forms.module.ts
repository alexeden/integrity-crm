import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorModule } from '../vendor/vendor.module';
import { AddressFormComponent } from './address-form';
import { NameFormComponent } from './name-form';
import { TransactionFormComponent } from './transaction-form';

@NgModule({
  imports: [
    ReactiveFormsModule,
    VendorModule,
  ],
  exports: [
    AddressFormComponent,
    NameFormComponent,
    TransactionFormComponent,
  ],
  declarations: [
    AddressFormComponent,
    NameFormComponent,
    TransactionFormComponent,
  ],
})
export class SharedFormsModule {}
