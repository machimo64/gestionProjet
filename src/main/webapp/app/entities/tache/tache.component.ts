import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { TacheDeleteDialogComponent } from './tache-delete-dialog.component';

@Component({
  selector: 'jhi-tache',
  templateUrl: './tache.component.html'
})
export class TacheComponent implements OnInit, OnDestroy {
  taches?: ITache[];
  eventSubscriber?: Subscription;

  constructor(protected tacheService: TacheService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tacheService.query().subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTaches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITache): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTaches(): void {
    this.eventSubscriber = this.eventManager.subscribe('tacheListModification', () => this.loadAll());
  }

  delete(tache: ITache): void {
    const modalRef = this.modalService.open(TacheDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tache = tache;
  }
}
