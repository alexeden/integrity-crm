import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prop' })
export class PropertyPipe implements PipeTransform {
  transform(obj: any, prop: string): any {
    if (!prop) {
      throw new Error(`You must provide the prop pipe with a property name string value! EG | prop:'propName'`);
    }
    else if (!obj || obj === null || typeof obj !== 'object') {
      return undefined;
    }
    else {
      return obj[prop];
    }
  }
}
