import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFichier } from 'app/shared/model/fichier.model';
import { FichierService } from './fichier.service';

@Component({
  templateUrl: './fichier-delete-dialog.component.html'
})
export class FichierDeleteDialogComponent {
  fichier?: IFichier;

  constructor(protected fichierService: FichierService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fichierService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fichierListModification');
      this.activeModal.close();
    });
  }
}
