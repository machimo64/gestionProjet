import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared/shared.module';
import { ProjetComponent } from './projet.component';
import { ProjetDetailComponent } from './projet-detail.component';
import { ProjetUpdateComponent } from './projet-update.component';
import { ProjetDeleteDialogComponent } from './projet-delete-dialog.component';
import { projetRoute } from './projet.route';
import {ProjetManageComponent} from "app/entities/projet/projet-manage.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {ProjetNewListeComponent} from "app/entities/projet/projet-new-liste.component";

@NgModule({
  imports: [GestionSharedModule, RouterModule.forChild(projetRoute), DragDropModule, MatButtonModule],
  declarations: [ProjetComponent, ProjetDetailComponent, ProjetUpdateComponent, ProjetDeleteDialogComponent, ProjetManageComponent, ProjetNewListeComponent],
  entryComponents: [ProjetDeleteDialogComponent]
})
export class GestionProjetModule {}
