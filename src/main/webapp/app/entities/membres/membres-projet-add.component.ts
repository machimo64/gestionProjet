import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {UserService} from "app/core/user/user.service";
import {IUser} from "app/core/user/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MembresService} from "app/entities/membres/membres.service";
import {ProjetService} from "app/entities/projet/projet.service";
import {IProjet} from "app/shared/model/projet.model";
import {Membres} from "app/shared/model/membres.model";
import {Role} from "app/shared/model/enumerations/role.model";

@Component({
  templateUrl: './membres-projet-add.component.html'
})
export class MembresProjetAddComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'email', 'add'];
  idProjet?: number;
  projet?: IProjet;
  users? : IUser[] | null = null;
  elements: IUser[] = [];
  previous: string | null = null;
  dataSource : any;

  constructor(public activeModal: NgbActiveModal, protected eventManager: JhiEventManager, protected userService: UserService, protected membresService: MembresService, protected projetService : ProjetService) {}



  ngOnInit(): void {

    // On récupére le projet afin de pouvoir créer des membres
    if(this.idProjet) this.projetService.find(this.idProjet).subscribe(projet => {
      if(projet.body) this.projet = projet.body
    });

    // On récupére les utilisateurs qui ne participent pas encore au projet
    if(this.idProjet) this.userService.queryByNotProjet(this.idProjet).subscribe(users => {
      this.users = users.body;
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

  ajouterMembre(user : IUser) : void {
    if(user.login) {
      const btn  = document.getElementById(user.login);
      if(btn) {
        btn.className = "btn btn-default btn-sm";
        btn.setAttribute('disabled', 'true');
      }
    }
     const membres = new Membres(undefined,Role.CONSULTER, user, this.projet);
    this.membresService.create(membres).subscribe(() => {
      this.eventManager.broadcast('membresListModification');
    });
  }

  ngOnDestroy(): void {

  }

}
