import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string) {
    return value.replace(new RegExp(" ", "g"), "-");;
  }

}
