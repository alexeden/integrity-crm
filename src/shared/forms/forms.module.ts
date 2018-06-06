import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorModule } from '../vendor/vendor.module';
import { AddressFormComponent } from './address-form';
import { ContactFormComponent } from './contact-form';
import { NameFormComponent } from './name-form';
import { TransactionFormComponent } from './transaction-form';

@NgModule({
  imports: [
    ReactiveFormsModule,
    VendorModule,
  ],
  exports: [
    AddressFormComponent,
    ContactFormComponent,
    NameFormComponent,
    TransactionFormComponent,
  ],
  declarations: [
    AddressFormComponent,
    ContactFormComponent,
    NameFormComponent,
    TransactionFormComponent,
  ],
})
export class SharedFormsModule {}
