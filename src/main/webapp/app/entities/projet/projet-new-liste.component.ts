import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IListe, Liste } from 'app/shared/model/liste.model';
import { ListeService } from '../liste/liste.service';
import {IProjet} from 'app/shared/model/projet.model';

@Component({
  selector: 'jhi-liste-update',
  templateUrl: './projet-new-liste.component.html'
})
export class ProjetNewListeComponent implements OnInit {
  isSaving = false;
  projet: IProjet | null = null;

  editForm = this.fb.group({
    titre: [null, [Validators.required]],
    projet: [null, Validators.required],
    position: [null, Validators.required]
  });

  constructor(
    protected listeService: ListeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // On récupére le projet
    this.activatedRoute.data.subscribe(({projet}) => {
      this.projet = projet;
    });
    this.editForm.patchValue({
      projet: this.projet });
    // On attribue a la liste une position, valeur aléatoire
    this.editForm.patchValue({position: 0});
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
      titre: this.editForm.get(['titre'])!.value,
      projet: this.editForm.get(['projet'])!.value,
      position : this.editForm.get(['position'])!.value
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
