import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMembres, Membres } from 'app/shared/model/membres.model';
import { MembresService } from './membres.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';

type SelectableEntity = IUser | IProjet;

@Component({
  selector: 'jhi-membres-update',
  templateUrl: './membres-update.component.html'
})
export class MembresUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  projets: IProjet[] = [];
  membre: IMembres | null = null;

  editForm = this.fb.group({
    id: [],
    role: [null, [Validators.required]],
    user: [null, Validators.required],
    projet: [null, Validators.required]
  });

  constructor(
    protected membresService: MembresService,
    protected userService: UserService,
    protected projetService: ProjetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membres }) => {
      this.updateForm(membres);
      this.membre = membres;

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.projetService.query().subscribe((res: HttpResponse<IProjet[]>) => (this.projets = res.body || []));
    });
  }

  updateForm(membres: IMembres): void {
    this.editForm.patchValue({
      id: membres.id,
      role: membres.role,
      user: membres.user,
      projet: membres.projet
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const membres = this.createFromForm();
    if (membres.id !== undefined) {
      this.subscribeToSaveResponse(this.membresService.update(membres));
    } else {
      this.subscribeToSaveResponse(this.membresService.create(membres));
    }
  }

  private createFromForm(): IMembres {
    return {
      ...new Membres(),
      id: this.editForm.get(['id'])!.value,
      role: this.editForm.get(['role'])!.value,
      user: this.editForm.get(['user'])!.value,
      projet: this.editForm.get(['projet'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembres>>): void {
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
