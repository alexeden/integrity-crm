import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
  ],
})
export class VendorModule {}
