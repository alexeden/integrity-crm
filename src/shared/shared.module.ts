import { NgModule } from '@angular/core';
import { NotPipe } from './not.pipe';
import { PropertyPipe } from './prop.pipe';

@NgModule({
  exports: [
    NotPipe,
    PropertyPipe,
  ],
  declarations: [
    NotPipe,
    PropertyPipe,
  ],
})
export class SharedModule {}
