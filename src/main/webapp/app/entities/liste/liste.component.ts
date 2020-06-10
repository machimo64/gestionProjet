import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IListe } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';
import { ListeDeleteDialogComponent } from './liste-delete-dialog.component';

@Component({
  selector: 'jhi-liste',
  templateUrl: './liste.component.html'
})
export class ListeComponent implements OnInit, OnDestroy {
  listes?: IListe[];
  eventSubscriber?: Subscription;

  constructor(protected listeService: ListeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.listeService.query().subscribe((res: HttpResponse<IListe[]>) => (this.listes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInListes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IListe): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInListes(): void {
    this.eventSubscriber = this.eventManager.subscribe('listeListModification', () => this.loadAll());
  }

  delete(liste: IListe): void {
    const modalRef = this.modalService.open(ListeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.liste = liste;
  }
}
