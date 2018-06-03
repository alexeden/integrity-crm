import { NgModule } from '@angular/core';
import { NotPipe } from './not.pipe';

@NgModule({
  exports: [
    NotPipe,
  ],
  declarations: [
    NotPipe,
  ],
})
export class SharedModule {}
