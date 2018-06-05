import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CustomersService } from './customers.service';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(
    private customerService: CustomersService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {

    const cid = route.paramMap.get('cid');
    const docSnapshot = await this.customerService.customerCollection.doc(cid || '').ref.get();

    if (docSnapshot.exists) {
      this.customerService.setSelectedCid(cid!);
      return true;
    }
    else {
      console.warn(`The cid "${cid}" doesn't match any customer IDs`);
      return false;
    }
  }
}
