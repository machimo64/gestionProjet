import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { IProjet, Projet } from 'app/shared/model/projet.model';
import { ProjetService } from './projet.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import {AccountService} from "app/core/auth/account.service";
import {Account} from "app/core/user/account.model";

@Component({
  selector: 'jhi-projet-update',
  templateUrl: './projet-update.component.html'
})
export class ProjetUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  user: IUser | null = null;
  authSubscription?: Subscription;
  account: Account | null = null;
  today = new Date();


  editForm = this.fb.group({
    id: [],
    titre: [null, [Validators.required]],
    dateDebut: [null, [Validators.required]],
    dateFin: [],
    description: [null, [Validators.required]],
    etat: [],
    user: [null, Validators.required],
    modele: [null]
  });

  constructor(
    protected projetService: ProjetService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if(this.account){
      this.userService.find(this.account.login).subscribe(user => {
        this.user = user;
        this.editForm.patchValue({ user: this.user})
      });
    }
    this.activatedRoute.data.subscribe(({ projet }) => {
      this.updateForm(projet);
      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }


  updateForm(projet: IProjet): void {
    this.editForm.patchValue({
      id: projet.id,
      titre: projet.titre,
      dateDebut: projet.dateDebut,
      dateFin: projet.dateFin,
      description: projet.description,
      etat: projet.etat,
      user: projet.user,
      modele: projet.modele
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projet = this.createFromForm();
    if (projet.id !== undefined) {
      this.subscribeToSaveResponse(this.projetService.update(projet));
    } else {
      this.subscribeToSaveResponse(this.projetService.create(projet));
    }
  }

  private createFromForm(): IProjet {
    return {
      ...new Projet(),
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      description: this.editForm.get(['description'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      user: this.editForm.get(['user'])!.value,
      modele: this.editForm.get(['modele'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjet>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
