import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@crm/environments/environment';
import { SharedModule } from '@crm/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomersService } from './customers.service';
import { CustomerListComponent } from './customer-list';
import {
  CustomerDetailsComponent,
  EditTransactionComponent,
  NoCustomerSelectedComponent,
  TransactionListComponent,
} from './customer-details';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    EditTransactionComponent,
    NoCustomerSelectedComponent,
    TransactionListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    CustomersService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
