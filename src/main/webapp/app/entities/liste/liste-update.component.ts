import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IListe, Liste } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';

@Component({
  selector: 'jhi-liste-update',
  templateUrl: './liste-update.component.html'
})
export class ListeUpdateComponent implements OnInit {
  isSaving = false;
  projets: IProjet[] = [];

  editForm = this.fb.group({
    id: [],
    titre: [null, [Validators.required]],
    position: [null, [Validators.required]],
    projet: [null, Validators.required]
  });

  constructor(
    protected listeService: ListeService,
    protected projetService: ProjetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ liste }) => {
      this.updateForm(liste);

      this.projetService.query().subscribe((res: HttpResponse<IProjet[]>) => (this.projets = res.body || []));
    });
  }

  updateForm(liste: IListe): void {
    this.editForm.patchValue({
      id: liste.id,
      titre: liste.titre,
      position: liste.position,
      projet: liste.projet
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const liste = this.createFromForm();
    if (liste.id !== undefined) {
      this.subscribeToSaveResponse(this.listeService.update(liste));
    } else {
      this.subscribeToSaveResponse(this.listeService.create(liste));
    }
  }

  private createFromForm(): IListe {
    return {
      ...new Liste(),
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      position: this.editForm.get(['position'])!.value,
      projet: this.editForm.get(['projet'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListe>>): void {
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

  trackById(index: number, item: IProjet): any {
    return item.id;
  }
}
