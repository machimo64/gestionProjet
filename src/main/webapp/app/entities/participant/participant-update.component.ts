import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParticipant, Participant } from 'app/shared/model/participant.model';
import { ParticipantService } from './participant.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache/tache.service';

type SelectableEntity = IUser | ITache;

@Component({
  selector: 'jhi-participant-update',
  templateUrl: './participant-update.component.html'
})
export class ParticipantUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  taches: ITache[] = [];

  editForm = this.fb.group({
    id: [],
    user: [null, Validators.required],
    tache: [null, Validators.required]
  });

  constructor(
    protected participantService: ParticipantService,
    protected userService: UserService,
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ participant }) => {
      this.updateForm(participant);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.tacheService.query().subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body || []));
    });
  }

  updateForm(participant: IParticipant): void {
    this.editForm.patchValue({
      id: participant.id,
      user: participant.user,
      tache: participant.tache
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const participant = this.createFromForm();
    if (participant.id !== undefined) {
      this.subscribeToSaveResponse(this.participantService.update(participant));
    } else {
      this.subscribeToSaveResponse(this.participantService.create(participant));
    }
  }

  private createFromForm(): IParticipant {
    return {
      ...new Participant(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      tache: this.editForm.get(['tache'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipant>>): void {
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
