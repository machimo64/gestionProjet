import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMembres } from 'app/shared/model/membres.model';
import { MembresService } from './membres.service';
import { MembresDeleteDialogComponent } from './membres-delete-dialog.component';

@Component({
  selector: 'jhi-membres',
  templateUrl: './membres.component.html'
})
export class MembresComponent implements OnInit, OnDestroy {
  membres?: IMembres[];
  eventSubscriber?: Subscription;

  constructor(protected membresService: MembresService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.membresService.query().subscribe((res: HttpResponse<IMembres[]>) => (this.membres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMembres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMembres): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMembres(): void {
    this.eventSubscriber = this.eventManager.subscribe('membresListModification', () => this.loadAll());
  }

  delete(membres: IMembres): void {
    const modalRef = this.modalService.open(MembresDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.membres = membres;
  }
}
