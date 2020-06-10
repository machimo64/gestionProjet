import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMembres } from 'app/shared/model/membres.model';
import { MembresService } from './membres.service';

@Component({
  templateUrl: './membres-delete-dialog.component.html'
})
export class MembresDeleteDialogComponent {
  membres?: IMembres;

  constructor(protected membresService: MembresService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.membresService.delete(id).subscribe(() => {
      this.eventManager.broadcast('membresListModification');
      this.activeModal.close();
    });
  }
}
