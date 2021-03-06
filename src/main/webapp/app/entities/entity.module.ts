import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.GestionProjetModule)
      },
      {
        path: 'membres',
        loadChildren: () => import('./membres/membres.module').then(m => m.GestionMembresModule)
      },
      {
        path: 'participant',
        loadChildren: () => import('./participant/participant.module').then(m => m.GestionParticipantModule)
      },
      {
        path: 'liste',
        loadChildren: () => import('./liste/liste.module').then(m => m.GestionListeModule)
      },
      {
        path: 'tache',
        loadChildren: () => import('./tache/tache.module').then(m => m.GestionTacheModule)
      },
      {
        path: 'commentaire',
        loadChildren: () => import('./commentaire/commentaire.module').then(m => m.GestionCommentaireModule)
      },
      {
        path: 'fichier',
        loadChildren: () => import('./fichier/fichier.module').then(m => m.GestionFichierModule)
      },
      {
        path: 'type-notification',
        loadChildren: () => import('./type-notification/type-notification.module').then(m => m.GestionTypeNotificationModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.GestionNotificationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GestionEntityModule {}
