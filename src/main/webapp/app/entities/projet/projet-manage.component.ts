import {Component, OnInit} from "@angular/core";
import {IProjet} from "app/shared/model/projet.model";
import {IListe} from "app/shared/model/liste.model";
import {ITache} from "app/shared/model/tache.model";
import {ActivatedRoute} from "@angular/router";
import {ListeService} from "app/entities/liste/liste.service";
import {TacheService} from "app/entities/tache/tache.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ListeDeleteDialogComponent} from "app/entities/liste/liste-delete-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {forkJoin, Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";
import {TacheDeleteDialogComponent} from "app/entities/tache/tache-delete-dialog.component";
import {TacheDetailComponent} from "app/entities/tache/tache-detail.component";
import {AccountService} from "app/core/auth/account.service";
import {IUser} from "app/core/user/user.model";
import {MembresService} from "app/entities/membres/membres.service";
import {Role} from "app/shared/model/enumerations/role.model";

@Component({
  selector: 'jhi-projet-manage',
  templateUrl: './projet-manage.component.html',
  styleUrls: ['./projet-manage.component.scss']
})
export class ProjetManageComponent implements OnInit{

  // Projet sur lequel on travaille
  projet: IProjet | null = null;

  user: IUser | null = null;

  // Liste des listes de tâches
  listes: IListe[] = [];

  // Listes des tâches du projet
  taches: ITache[] = [];

  isMembre: boolean | undefined;

  // Pour connecter les listes du drag&drop
  listesConnect : string[] = [];

  // Tableau qui trie les tâches selon leur liste
  tableauTaches = new Map<number, ITache[]>();
  liste: IListe | null = null;

  eventSubscriber?: Subscription;

  // On récupére la liste que l'on modifie, lorsqu'on modifie le nom de la liste
  listeEnModif? : IListe | null = null;


  constructor(protected activatedRoute: ActivatedRoute, protected eventManager: JhiEventManager, protected listeService : ListeService, protected tacheService : TacheService, protected modalService: NgbModal, protected accountService : AccountService, protected membreService : MembresService) {
  }

  ngOnInit(): void {
    this.isMembre = false;
    this.loadAll();
    this.registerChangeInListes();
    this.checkMembre();
  }

  registerChangeInListes(): void {
    this.eventSubscriber = this.eventManager.subscribe('listeListModification', () => this.loadAll());
    this.eventSubscriber = this.eventManager.subscribe('tacheListModification', () => this.loadAll());
  }

  // Fonction permettant de récuperer le projet, ses listes ainsi que les tâches de chaque listes
  loadAll() : void {
    // On récupére le projet
     this.activatedRoute.data.subscribe(({projet}) => {
      this.projet = projet;
    });

    // On récupere les listes et les taches du projet, puis on trie les taches par liste
    if (this.projet?.id) {
      forkJoin([this.listeService.queryByProjet(this.projet.id), this.tacheService.queryByProjet(this.projet.id)]).subscribe(resultat => {
        if(resultat[0].body) this.listes = resultat[0].body;
        this.listes.forEach(liste => {
          const tacheListe = Array<ITache>();
          if(resultat[1].body) resultat[1].body.forEach(tache => { if(tache.liste?.id === liste.id) tacheListe.push(tache); });
          if(liste.id) this.tableauTaches.set(liste.id, tacheListe);
        })
      });
    }
  }

  checkMembre() : void{
    if(this.projet){
      if(this.projet.id) this.membreService.queryIfMembre(this.projet.id).subscribe(resultat => {
       if(resultat.body) if(resultat.body.role === Role.MODIFIER) this.isMembre = true;
      });
    }
  }

  // Fait apparaitre un modal permettant de supprimer une liste
  deleteListe(liste: IListe): void {
    const modalRef = this.modalService.open(ListeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.liste = liste;
  }

  // Fait apparaitre un modal permettant de supprimer une tache
  deleteTache(tache: ITache): void {
    const modalRef = this.modalService.open(TacheDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tache = tache;
  }

  // Fait apparaitre un modal permettant de supprimer une tache
  detailsTache(tache: ITache): void {
      const modalRef = this.modalService.open(TacheDetailComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.tache = tache;
  }

  // Fonction qui change les tâche de place dans la page
  changeTache(event: CdkDragDrop<ITache[]>) : void {
    // on met a jour la position de la tâche dans la liste
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if(this.tableauTaches.get(+event.container.id)) {
        const tabTaches: ITache[] | undefined = this.tableauTaches.get(+event.container.id);
        if(tabTaches) {
          tabTaches.forEach(function (tache, index): void {
            tache.position = index + 1;
          });
          tabTaches.forEach(tache => this.tacheService.update(tache).subscribe(info => console.log(info)));
        }
      }
    } else {
      // On change la tâche de liste, dans la bdd et dans la page
      if(this.tableauTaches && this.listes) {
        const taches : ITache[] | undefined = this.tableauTaches.get(+event.previousContainer.id);
        if(taches) {
          const tacheEnCours: ITache | undefined = taches[event.previousIndex];
          tacheEnCours.liste = this.listes.find(liste => liste.id === +event.container.id);
          this.tacheService.update(tacheEnCours).subscribe(info => console.log(info));
        }
      }
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  // Fonction qui change les listes de place dans le tableau, et met a jour la position de chaque liste dans la base
  changeListe($event: CdkDragDrop<IListe[]>) : void {
    moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    this.listes?.forEach(function (liste, index) : void{
      liste.position = index+1;
    });
    this.listes?.forEach(liste => this.listeService.update(liste).subscribe(info => console.log(info)));
  }

  // Fonction qui récupére la liste, pour modifier son titre
  getListe(id : number) : void {
    this.listeEnModif = this.listes?.find(liste => liste.id === id);
  }

  // Fonction qui permet de changer le titre d'une liste
  changeTitre($event : any) : void {
    if($event.srcElement.value !== this.listeEnModif?.titre){
      if($event.srcElement.value.length === 0){
        $event.srcElement.value = this.listeEnModif?.titre;
      }else{
        const liste : IListe = this.listeEnModif;
        liste.titre = $event.srcElement.value;
        this.listeService.update(liste).subscribe(info => console.log(info));
      }
    }
  }

  // Fonction appelée lors de la création d'une liste qui permet de récupérer les ID des autres listes afin de les connecter pour le drag & drop
  getListesConnected(idListe : number) : string[] {
    this.listes.forEach(liste => { if(idListe !== liste.id) this.listesConnect.push(""+liste.id);});
    return this.listesConnect;
  }

}
