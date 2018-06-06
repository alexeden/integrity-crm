import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eq',
})
export class EqualsPipe implements PipeTransform {
  transform(value: any, test: any): boolean {
    return value === test;
  }
}
