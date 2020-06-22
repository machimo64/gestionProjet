import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeNotification } from 'app/shared/model/type-notification.model';
import { TypeNotificationService } from './type-notification.service';
import { TypeNotificationDeleteDialogComponent } from './type-notification-delete-dialog.component';

@Component({
  selector: 'jhi-type-notification',
  templateUrl: './type-notification.component.html'
})
export class TypeNotificationComponent implements OnInit, OnDestroy {
  typeNotifications?: ITypeNotification[];
  eventSubscriber?: Subscription;

  constructor(
    protected typeNotificationService: TypeNotificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.typeNotificationService.query().subscribe((res: HttpResponse<ITypeNotification[]>) => (this.typeNotifications = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTypeNotifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITypeNotification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTypeNotifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('typeNotificationListModification', () => this.loadAll());
  }

  delete(typeNotification: ITypeNotification): void {
    const modalRef = this.modalService.open(TypeNotificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeNotification = typeNotification;
  }
}
