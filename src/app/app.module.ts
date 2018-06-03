import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@crm/environments/environment';
import { VendorModule } from './vendor.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerListComponent } from './customer-list';
import { CustomerDetailsComponent } from './customer-details';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    VendorModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
