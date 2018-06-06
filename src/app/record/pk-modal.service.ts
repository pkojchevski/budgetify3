import { without, find } from 'lodash';
import { PkModalComponent } from './pk-modal.component';

export class PkModalService {
   private modals: PkModalComponent[] = [];
   add(modal: any) {
     this.modals.push(modal);
   }

   remove(id: string) {
     const modalToRemove = find(this.modals, {id: id});
     this.modals = without(this.modals, modalToRemove);
   }

   open(id: string) {
     console.log('open modal');
     const modal = find(this.modals, {id: id});
     modal.open();
   }

   close(id: string) {
     const modal: any = find(this.modals, {id: id});
     modal.close();
   }




}
