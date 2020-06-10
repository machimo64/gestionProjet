import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionSharedModule } from 'app/shared/shared.module';
import { ListeComponent } from './liste.component';
import { ListeDetailComponent } from './liste-detail.component';
import { ListeUpdateComponent } from './liste-update.component';
import { ListeDeleteDialogComponent } from './liste-delete-dialog.component';
import { listeRoute } from './liste.route';
import {ListeNewTacheComponent} from "app/entities/liste/liste-new-tache.component";

@NgModule({
  imports: [GestionSharedModule, RouterModule.forChild(listeRoute)],
  declarations: [ListeComponent, ListeDetailComponent, ListeUpdateComponent, ListeDeleteDialogComponent, ListeNewTacheComponent],
  entryComponents: [ListeDeleteDialogComponent]
})
export class GestionListeModule {}
