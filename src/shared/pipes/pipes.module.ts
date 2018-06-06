import { NgModule } from '@angular/core';

import { EqualsPipe } from './equals.pipe';
import { NotPipe } from './not.pipe';
import { PropertyPipe } from './prop.pipe';

@NgModule({
  exports: [
    EqualsPipe,
    NotPipe,
    PropertyPipe,
  ],
  declarations: [
    EqualsPipe,
    NotPipe,
    PropertyPipe,
  ],
})
export class SharedPipesModule {}
