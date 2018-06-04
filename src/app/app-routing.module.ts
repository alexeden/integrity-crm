import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CustomerDetailsComponent,
  NoCustomerSelectedComponent,
} from './customer-details';
import { CustomerGuard } from './customer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
  {
    path: 'customers/:cid',
    component: CustomerDetailsComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'customers',
    component: NoCustomerSelectedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CustomerGuard],
})
export class AppRoutingModule { }
