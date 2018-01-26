import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../interfaces/task';


@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === undefined) {
      return value;
    }

    let titlesFiltered: Task[] = [];

    value.forEach((task) => {
      if(task.title.toLowerCase().indexOf(args.toLowerCase()) !== -1) {
        titlesFiltered.push(task);
      }
    });

    return titlesFiltered;
  }

}
