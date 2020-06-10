import { Component} from '@angular/core';

import { ITache } from 'app/shared/model/tache.model';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-tache-detail',
  templateUrl: './tache-detail-dialog.component.html'
})
export class TacheDetailDialogComponent {
  tache: ITache | null = null;

  constructor(public activeModal: NgbActiveModal) {
  }


  cancel() : void {
    this.activeModal.dismiss();
  }

  getEtat(etat: any) : any{
   if(etat) return "Terminée";
   return "En cours";
  }
}
