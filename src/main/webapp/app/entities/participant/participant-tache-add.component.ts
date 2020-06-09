import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {UserService} from "app/core/user/user.service";
import {IUser} from "app/core/user/user.model";
import {MembresService} from "app/entities/membres/membres.service";
import {TacheService} from "app/entities/tache/tache.service";
import {ITache} from "app/shared/model/tache.model";
import {MatTableDataSource} from "@angular/material/table";
import {Participant} from "app/shared/model/participant.model";
import {ParticipantService} from "app/entities/participant/participant.service";

@Component({
  templateUrl: './participant-tache-add.component.html'
})
export class ParticipantTacheAddComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'email', 'add'];
  idTache?: number;
  tache?: ITache;
  users : IUser[] = [];
  elements: IUser[] = [];
  previous: string | null = null;
  dataSource : any;

  constructor(public activeModal: NgbActiveModal, protected eventManager: JhiEventManager, protected userService: UserService, protected membresService : MembresService, protected participantService : ParticipantService, protected tacheService : TacheService) {}



  ngOnInit(): void {
    if(this.idTache) this.tacheService.find(this.idTache).subscribe(tache => {
      if(tache.body) this.tache = tache.body;
    });

    if(this.idTache) this.membresService.queryByNotTache(this.idTache).subscribe(membres => {
      if(membres.body) membres.body.forEach(membre => {
        if(membre.user)this.users.push(membre.user);
      });
      if(this.users) this.dataSource = new MatTableDataSource(this.users);
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ajouterParticipant(user : IUser) : void {
     if(user.login) {
      const btn  = document.getElementById(user.login);
      if(btn) {
        btn.className = "btn btn-default btn-sm";
        btn.setAttribute('disabled', 'true');
      }
    }
     const participant = new Participant(undefined, user, this.tache);
    this.participantService.create(participant).subscribe(() => {
      this.eventManager.broadcast('participantListModification');
    });
  }

  ngOnDestroy(): void {

  }

}
