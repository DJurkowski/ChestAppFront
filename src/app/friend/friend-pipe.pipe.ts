import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendFilter'
})
export class FriendPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.userOneName.toString().toLowerCase().includes(searchText) || it.userTwoName.toString().toLowerCase().includes(searchText) ;
    });
  }

}
