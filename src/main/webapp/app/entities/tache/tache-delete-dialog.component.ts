import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';

@Component({
  templateUrl: './tache-delete-dialog.component.html'
})
export class TacheDeleteDialogComponent {
  tache?: ITache;

  constructor(protected tacheService: TacheService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tacheService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tacheListModification');
      this.activeModal.close();
    });
  }
}
