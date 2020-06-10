import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITache } from 'app/shared/model/tache.model';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ParticipantTacheAddComponent} from "app/entities/participant/participant-tache-add.component";
import {ParticipantService} from "app/entities/participant/participant.service";
import {IParticipant} from "app/shared/model/participant.model";
import {ParticipantDeleteDialogComponent} from "app/entities/participant/participant-delete-dialog.component";
import {JhiEventManager} from "ng-jhipster";
import {forkJoin, Subscription} from "rxjs";
import {Role} from "app/shared/model/enumerations/role.model";
import {MembresService} from "app/entities/membres/membres.service";
import {CommentaireService} from "app/entities/commentaire/commentaire.service";
import {Commentaire, ICommentaire} from "app/shared/model/commentaire.model";
import {IUser} from "app/core/user/user.model";
import {CommentaireDeleteDialogComponent} from "app/entities/commentaire/commentaire-delete-dialog.component";
import * as moment from "moment";

@Component({
  selector: 'jhi-tache-detail',
  templateUrl: './tache-detail.component.html'
})
export class TacheDetailComponent implements OnInit {
  tache: ITache | null = null;
  user: IUser | null = null;
  isMembre: boolean | undefined;
  participants: IParticipant[] = [];
  commentaires: ICommentaire[] = [];
  eventSubscriber?: Subscription;
  modif: boolean | undefined;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected participantService : ParticipantService,
    protected membreService: MembresService,
    protected commentaireService: CommentaireService
  ) {}

  ngOnInit(): void {
    this.isMembre = false;
    this.modif = false;
    this.activatedRoute.data.subscribe(({ tache }) => (this.tache = tache));
    this.loadAll();
    this.registerChangeInParticipant();
    this.checkMembre();
  }

  checkMembre() : void {
    if (this.tache && this.tache.liste && this.tache.liste.projet && this.tache.liste.projet.id) {
      this.membreService.queryIfMembre(this.tache.liste.projet.id).subscribe(resultat => {
        if (resultat.body && resultat.body.role === Role.MODIFIER && resultat.body.user ){
          this.isMembre = true;
          this.user = resultat.body.user;
        }
      });
    }
  }

  loadAll() : void {
    // On récupére les participants et les commentaires de la tâche
    if(this.tache && this.tache.id) forkJoin([this.participantService.findByTache(this.tache.id), this.commentaireService.findByTache(this.tache.id)]).subscribe(resultat => {
      this.participants = resultat[0].body || [];
      this.commentaires = resultat[1].body || [];
    })
  }

  previousState(): void {
    window.history.back();
  }

  addParticipant(idTache : number) : void {
    const modalRef = this.modalService.open(ParticipantTacheAddComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idTache = idTache;
  }

  deleteParticipant(participant : IParticipant) : void {
    const modalRef = this.modalService.open(ParticipantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.participant = participant;
  }

  registerChangeInParticipant(): void {
    this.eventSubscriber = this.eventManager.subscribe('participantListModification', () => this.loadAll());
  }

   addCommentaire(): void{
    const com = document.getElementById('newCommentaire') as HTMLTextAreaElement;
    if(this.user && this.tache){
      const commentaire = new Commentaire(undefined, com.value, moment(), this.user, this.tache);
      this.commentaireService.create(commentaire).subscribe(result => {
        if(result.body) commentaire.id = result.body.id; this.commentaires.push(commentaire);
      });
      com.value = "";
      com.blur();
      }
    }

  modifierCom(idCom : number): void{
    console.log("test");
    const id = ""+idCom;
    const p = document.getElementById(id+"p");
    const inp = document.getElementById(id+"in");
    const btM = document.getElementById(id+"btm") as HTMLButtonElement;
    const btS = document.getElementById(id+"bts") as HTMLButtonElement;
    if(p) p.hidden = true;
    if(inp) inp.hidden = false;
    if(btM) btM.hidden = true;
    if(btS) btS.hidden = true;
  }

  confirmModif(commentaire: ICommentaire): void{
    const inp = document.getElementById(commentaire.id+"in") as HTMLTextAreaElement;
    const p = document.getElementById(commentaire.id+"p") as HTMLParagraphElement;
    const btM = document.getElementById(commentaire.id+"btm") as HTMLButtonElement;
    const btS = document.getElementById(commentaire.id+"bts") as HTMLButtonElement;
    if(inp && p) commentaire.contenu = inp.value; p.textContent = inp.value; p.hidden = false; inp.hidden = true;
    btM.hidden = false;
    btS.hidden = false;
    this.commentaireService.update(commentaire).subscribe();
  }

  deleteCommentaire(commentaire: ICommentaire) : void {
    const modalRef = this.modalService.open(CommentaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.commentaire = commentaire;
  }

  compareUsers(user: IUser, user2: IUser) : boolean {
    return JSON.stringify(user) === JSON.stringify(user2);
  }
}
