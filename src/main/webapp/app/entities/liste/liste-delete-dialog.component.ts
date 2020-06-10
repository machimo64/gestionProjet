import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListe } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';

@Component({
  templateUrl: './liste-delete-dialog.component.html'
})
export class ListeDeleteDialogComponent {
  liste?: IListe;

  constructor(protected listeService: ListeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.listeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('listeListModification');
      this.activeModal.close();
    });
  }
}
