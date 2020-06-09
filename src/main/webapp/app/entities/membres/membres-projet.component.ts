import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMembres } from 'app/shared/model/membres.model';
import { MembresService } from './membres.service';
import { MembresDeleteDialogComponent } from './membres-delete-dialog.component';
import {IProjet} from "app/shared/model/projet.model";
import {ActivatedRoute} from "@angular/router";
import {MembresProjetAddComponent} from "app/entities/membres/membres-projet-add.component";
import {Role} from "app/shared/model/enumerations/role.model";

@Component({
  selector: 'jhi-membres',
  templateUrl: './membres-projet.component.html'
})
export class MembresProjetComponent implements OnInit, OnDestroy {
  membres?: IMembres[];
  projet?: IProjet;
  idProjet : any = 0;
  eventSubscriber?: Subscription;
  isMembre: boolean | undefined;

  constructor(protected membresService: MembresService, protected eventManager: JhiEventManager, protected modalService: NgbModal, protected activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.isMembre = false;
    // On récupére les membres du projet
    this.idProjet = this.activatedRoute.snapshot.params['idProjet'];
    if(this.idProjet) this.loadAll(); this.checkMembre();
    this.registerChangeInMembres();
  }

  checkMembre() : void {
    this.membresService.queryIfMembre(this.idProjet).subscribe(resultat => {
      if (resultat.body) if(resultat.body.role === Role.MODIFIER){
        this.isMembre = true;
      }
    });
  }

  loadAll(): void {
    this.membresService.queryByProjet(this.idProjet).subscribe((res: HttpResponse<IMembres[]>) => {(this.membres = res.body || [])});
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

  delete(membres: IMembres): void {
    const modalRef = this.modalService.open(MembresDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.membres = membres;
  }

  addMembres(idProjet : number) : void {
    const modalRef = this.modalService.open(MembresProjetAddComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idProjet = idProjet;
  }

  registerChangeInMembres(): void {
    this.eventSubscriber = this.eventManager.subscribe('membresListModification', () => this.loadAll());
  }
}
