import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorModule } from '../vendor/vendor.module';
import { TransactionFormComponent } from './transaction-form';

@NgModule({
  imports: [
    ReactiveFormsModule,
    VendorModule,
  ],
  declarations: [
    TransactionFormComponent,
  ],
})
export class SharedFormsModule {}
