import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared/shared.module';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';
import { TacheDeleteDialogComponent } from './tache-delete-dialog.component';
import { tacheRoute } from './tache.route';
import {TacheDetailDialogComponent} from "app/entities/tache/tache-detail-dialog.component";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(tacheRoute), MatSidenavModule],
  declarations: [TacheComponent, TacheDetailComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDetailDialogComponent],
  entryComponents: [TacheDeleteDialogComponent]
})
export class GestionTacheModule {}
