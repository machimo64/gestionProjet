import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITache, Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { IListe } from 'app/shared/model/liste.model';
import { ListeService } from 'app/entities/liste/liste.service';

@Component({
  selector: 'jhi-tache-update',
  templateUrl: './tache-update.component.html'
})
export class TacheUpdateComponent implements OnInit {
  isSaving = false;
  listes: IListe[] = [];
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    titre: [null, [Validators.required]],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    description: [null, [Validators.required]],
    etat: [],
    poids: [],
    categorie: [],
    position: [null, [Validators.required]],
    liste: [null, Validators.required]
  });

  constructor(
    protected tacheService: TacheService,
    protected listeService: ListeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tache }) => {
      this.updateForm(tache);

      this.listeService.query().subscribe((res: HttpResponse<IListe[]>) => (this.listes = res.body || []));

      const fieldListe = document.getElementById('field_liste');
      if(fieldListe) fieldListe.style.visibility = 'hidden';
    });
  }

  updateForm(tache: ITache): void {
    this.editForm.patchValue({
      id: tache.id,
      titre: tache.titre,
      dateDebut: tache.dateDebut,
      dateFin: tache.dateFin,
      description: tache.description,
      etat: tache.etat,
      poids: tache.poids,
      categorie: tache.categorie,
      position: tache.position,
      liste: tache.liste
    });
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
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      description: this.editForm.get(['description'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      poids: this.editForm.get(['poids'])!.value,
      categorie: this.editForm.get(['categorie'])!.value,
      position: this.editForm.get(['position'])!.value,
      liste: this.editForm.get(['liste'])!.value
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
