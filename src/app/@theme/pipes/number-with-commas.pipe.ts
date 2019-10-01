import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sigNumeroConComas' })
export class NumberWithCommasPipe implements PipeTransform {

  transform(input: number): string {
    return '$ ' + new Intl.NumberFormat().format(Math.round(input / 1000));
  }
}
