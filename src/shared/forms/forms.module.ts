import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorModule } from '../vendor/vendor.module';
import { AddressFormComponent } from './address-form';
import { TransactionFormComponent } from './transaction-form';

@NgModule({
  imports: [
    ReactiveFormsModule,
    VendorModule,
  ],
  exports: [
    AddressFormComponent,
    TransactionFormComponent,
  ],
  declarations: [
    AddressFormComponent,
    TransactionFormComponent,
  ],
})
export class SharedFormsModule {}
