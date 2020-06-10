import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParticipant } from 'app/shared/model/participant.model';
import { ParticipantService } from './participant.service';
import { ParticipantDeleteDialogComponent } from './participant-delete-dialog.component';

@Component({
  selector: 'jhi-participant',
  templateUrl: './participant.component.html'
})
export class ParticipantComponent implements OnInit, OnDestroy {
  participants?: IParticipant[];
  eventSubscriber?: Subscription;

  constructor(
    protected participantService: ParticipantService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.participantService.query().subscribe((res: HttpResponse<IParticipant[]>) => (this.participants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParticipants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParticipant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParticipants(): void {
    this.eventSubscriber = this.eventManager.subscribe('participantListModification', () => this.loadAll());
  }

  delete(participant: IParticipant): void {
    const modalRef = this.modalService.open(ParticipantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.participant = participant;
  }
}
