import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any): number {
    let now:any = new Date();
      var difference = now.getTime() - value.getTime();
      difference= difference/1000;
      difference= difference/(60*60)
      difference= difference/24;
      return Math.ceil(difference) - 1;
  }

}