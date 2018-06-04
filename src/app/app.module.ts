import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@crm/environments/environment';
import { SharedModule } from '@crm/shared';
import { VendorModule } from './vendor.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomersService } from './customers.service';
import { TransactionsService } from './transactions.service';
import { CustomerListComponent } from './customer-list';
import {
  CustomerDetailsComponent,
  NoCustomerSelectedComponent,
  TransactionListComponent,
} from './customer-details';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    NoCustomerSelectedComponent,
    TransactionListComponent,
  ],
  imports: [
    BrowserModule,
    VendorModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    CustomersService,
    TransactionsService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
