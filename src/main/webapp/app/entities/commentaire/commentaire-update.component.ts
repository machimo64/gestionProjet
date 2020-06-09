import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICommentaire, Commentaire } from 'app/shared/model/commentaire.model';
import { CommentaireService } from './commentaire.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache/tache.service';

type SelectableEntity = IUser | ITache;

@Component({
  selector: 'jhi-commentaire-update',
  templateUrl: './commentaire-update.component.html'
})
export class CommentaireUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  taches: ITache[] = [];

  editForm = this.fb.group({
    id: [],
    contenu: [null, [Validators.required]],
    dateHeure: [null, [Validators.required]],
    user: [null, Validators.required],
    tache: [null, Validators.required]
  });

  constructor(
    protected commentaireService: CommentaireService,
    protected userService: UserService,
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commentaire }) => {
      if (!commentaire.id) {
        const today = moment().startOf('day');
        commentaire.dateHeure = today;
      }

      this.updateForm(commentaire);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.tacheService.query().subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body || []));
    });
  }

  updateForm(commentaire: ICommentaire): void {
    this.editForm.patchValue({
      id: commentaire.id,
      contenu: commentaire.contenu,
      dateHeure: commentaire.dateHeure ? commentaire.dateHeure.format(DATE_TIME_FORMAT) : null,
      user: commentaire.user,
      tache: commentaire.tache
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commentaire = this.createFromForm();
    if (commentaire.id !== undefined) {
      this.subscribeToSaveResponse(this.commentaireService.update(commentaire));
    } else {
      this.subscribeToSaveResponse(this.commentaireService.create(commentaire));
    }
  }

  private createFromForm(): ICommentaire {
    return {
      ...new Commentaire(),
      id: this.editForm.get(['id'])!.value,
      contenu: this.editForm.get(['contenu'])!.value,
      dateHeure: this.editForm.get(['dateHeure'])!.value ? moment(this.editForm.get(['dateHeure'])!.value, DATE_TIME_FORMAT) : undefined,
      user: this.editForm.get(['user'])!.value,
      tache: this.editForm.get(['tache'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommentaire>>): void {
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
