import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITache, Tache } from 'app/shared/model/tache.model';
import { TacheService } from '../tache/tache.service';
import { IListe } from 'app/shared/model/liste.model';

@Component({
  selector: 'jhi-tache-update',
  templateUrl: './liste-new-tache.component.html'
})
export class ListeNewTacheComponent implements OnInit {
  isSaving = false;
  liste: IListe | null = null;
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    titre: [null, [Validators.required]],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    description: [null, [Validators.required]],
    etat: [],
    poids: [],
    categorie: [],
    position: [null, Validators.required],
    liste: [null, Validators.required]
  });

  constructor(
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // On récupére la liste
    this.activatedRoute.data.subscribe(({liste}) => {
      this.liste = liste;
    });
    this.editForm.patchValue({
      liste: this.liste });
    this.editForm.patchValue({position: 0});
  }


  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tache = this.createFromForm();
    if (tache.id !== undefined) {
      this.subscribeToSaveResponse(this.tacheService.update(tache));
    } else {
      this.subscribeToSaveResponse(this.tacheService.create(tache));
    }
  }

  private createFromForm(): ITache {
    return {
      ...new Tache(),
      titre: this.editForm.get(['titre'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      description: this.editForm.get(['description'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      poids: this.editForm.get(['poids'])!.value,
      categorie: this.editForm.get(['categorie'])!.value,
      liste: this.editForm.get(['liste'])!.value,
      position : this.editForm.get(['position'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITache>>): void {
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

  trackById(index: number, item: IListe): any {
    return item.id;
  }
}
