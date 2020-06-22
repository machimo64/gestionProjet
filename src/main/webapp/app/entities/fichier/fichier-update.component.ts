import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IFichier, Fichier } from 'app/shared/model/fichier.model';
import { FichierService } from './fichier.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IMembres } from 'app/shared/model/membres.model';
import { MembresService } from 'app/entities/membres/membres.service';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache/tache.service';

type SelectableEntity = IMembres | ITache;

@Component({
  selector: 'jhi-fichier-update',
  templateUrl: './fichier-update.component.html'
})
export class FichierUpdateComponent implements OnInit {
  isSaving = false;
  membres: IMembres[] = [];
  taches: ITache[] = [];

  editForm = this.fb.group({
    id: [],
    fichier: [null, [Validators.required]],
    fichierContentType: [],
    membres: [null, Validators.required],
    tache: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected fichierService: FichierService,
    protected membresService: MembresService,
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fichier }) => {
      this.updateForm(fichier);

      this.membresService.query().subscribe((res: HttpResponse<IMembres[]>) => (this.membres = res.body || []));

      this.tacheService.query().subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body || []));
    });
  }

  updateForm(fichier: IFichier): void {
    this.editForm.patchValue({
      id: fichier.id,
      fichier: fichier.fichier,
      fichierContentType: fichier.fichierContentType,
      membres: fichier.membres,
      tache: fichier.tache
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gestionApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fichier = this.createFromForm();
    if (fichier.id !== undefined) {
      this.subscribeToSaveResponse(this.fichierService.update(fichier));
    } else {
      this.subscribeToSaveResponse(this.fichierService.create(fichier));
    }
  }

  private createFromForm(): IFichier {
    return {
      ...new Fichier(),
      id: this.editForm.get(['id'])!.value,
      fichierContentType: this.editForm.get(['fichierContentType'])!.value,
      fichier: this.editForm.get(['fichier'])!.value,
      membres: this.editForm.get(['membres'])!.value,
      tache: this.editForm.get(['tache'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFichier>>): void {
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
