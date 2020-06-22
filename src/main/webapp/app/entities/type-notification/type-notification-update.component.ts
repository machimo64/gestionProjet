import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITypeNotification, TypeNotification } from 'app/shared/model/type-notification.model';
import { TypeNotificationService } from './type-notification.service';

@Component({
  selector: 'jhi-type-notification-update',
  templateUrl: './type-notification-update.component.html'
})
export class TypeNotificationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    contenu: [null, [Validators.required]]
  });

  constructor(
    protected typeNotificationService: TypeNotificationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeNotification }) => {
      this.updateForm(typeNotification);
    });
  }

  updateForm(typeNotification: ITypeNotification): void {
    this.editForm.patchValue({
      id: typeNotification.id,
      nom: typeNotification.nom,
      contenu: typeNotification.contenu
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeNotification = this.createFromForm();
    if (typeNotification.id !== undefined) {
      this.subscribeToSaveResponse(this.typeNotificationService.update(typeNotification));
    } else {
      this.subscribeToSaveResponse(this.typeNotificationService.create(typeNotification));
    }
  }

  private createFromForm(): ITypeNotification {
    return {
      ...new TypeNotification(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      contenu: this.editForm.get(['contenu'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeNotification>>): void {
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
}
