import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tourFilter'
})
export class TourSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.name.toString().toLowerCase().includes(searchText);
    });
  }

}
