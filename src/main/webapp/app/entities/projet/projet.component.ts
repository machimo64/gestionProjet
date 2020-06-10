import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from './projet.service';
import { ProjetDeleteDialogComponent } from './projet-delete-dialog.component';

@Component({
  selector: 'jhi-projet',
  templateUrl: './projet.component.html'
})
export class ProjetComponent implements OnInit, OnDestroy {
  projetsMembre?: IProjet[];
  eventSubscriber?: Subscription;

  constructor(protected projetService: ProjetService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.projetService.queryMembre().subscribe((res: HttpResponse<IProjet[]>) => {
      (this.projetsMembre = res.body || [])
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProjets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProjet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProjets(): void {
    this.eventSubscriber = this.eventManager.subscribe('projetListModification', () => this.loadAll());
  }

  delete(projet: IProjet): void {
    const modalRef = this.modalService.open(ProjetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.projet = projet;
  }

}
