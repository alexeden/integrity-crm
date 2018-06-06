import { NgModule } from '@angular/core';
import { VendorModule } from './vendor/vendor.module';
import { SharedFormsModule } from './forms/forms.module';
import { SharedPipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [
    VendorModule,
    SharedFormsModule,
    SharedPipesModule,
  ],
})
export class SharedModule {}
