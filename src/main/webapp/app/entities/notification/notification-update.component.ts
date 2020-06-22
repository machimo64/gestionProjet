import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INotification, Notification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITypeNotification } from 'app/shared/model/type-notification.model';
import { TypeNotificationService } from 'app/entities/type-notification/type-notification.service';

type SelectableEntity = IUser | ITypeNotification;

@Component({
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  typenotifications: ITypeNotification[] = [];

  editForm = this.fb.group({
    id: [],
    emetteur: [null, Validators.required],
    destinataire: [null, Validators.required],
    typeNotification: [null, Validators.required]
  });

  constructor(
    protected notificationService: NotificationService,
    protected userService: UserService,
    protected typeNotificationService: TypeNotificationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.updateForm(notification);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.typeNotificationService.query().subscribe((res: HttpResponse<ITypeNotification[]>) => (this.typenotifications = res.body || []));
    });
  }

  updateForm(notification: INotification): void {
    this.editForm.patchValue({
      id: notification.id,
      emetteur: notification.emetteur,
      destinataire: notification.destinataire,
      typeNotification: notification.typeNotification
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id'])!.value,
      emetteur: this.editForm.get(['emetteur'])!.value,
      destinataire: this.editForm.get(['destinataire'])!.value,
      typeNotification: this.editForm.get(['typeNotification'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
