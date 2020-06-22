import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeNotification } from 'app/shared/model/type-notification.model';
import { TypeNotificationService } from './type-notification.service';

@Component({
  templateUrl: './type-notification-delete-dialog.component.html'
})
export class TypeNotificationDeleteDialogComponent {
  typeNotification?: ITypeNotification;

  constructor(
    protected typeNotificationService: TypeNotificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeNotificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('typeNotificationListModification');
      this.activeModal.close();
    });
  }
}
