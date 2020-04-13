import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  dateFormat = "dd-MM-yyyy";
  transform(value: any): number {
    let today:Date = new Date(); 
    let todayWithNoTime:any = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    todayWithNoTime.PipeTransform(value, this.dateFormat)
    return todayWithNoTime
  }

}