import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
  ],
})
export class VendorModule {}
