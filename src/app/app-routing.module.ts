import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CustomerDetailsComponent,
  NoCustomerSelectedComponent,
} from './customer-details';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
  {
    path: 'customers/:cid',
    component: CustomerDetailsComponent,
  },
  {
    path: 'customers',
    component: NoCustomerSelectedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
