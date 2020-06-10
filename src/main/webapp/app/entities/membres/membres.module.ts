import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared/shared.module';
import { MembresComponent } from './membres.component';
import { MembresDetailComponent } from './membres-detail.component';
import { MembresUpdateComponent } from './membres-update.component';
import { MembresDeleteDialogComponent } from './membres-delete-dialog.component';
import { membresRoute } from './membres.route';
import {MembresProjetComponent} from "app/entities/membres/membres-projet.component";
import {MembresProjetAddComponent} from "app/entities/membres/membres-projet-add.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  imports: [GestionSharedModule, RouterModule.forChild(membresRoute), MatFormFieldModule, MatInputModule, MatTableModule],
  declarations: [MembresComponent, MembresDetailComponent, MembresUpdateComponent, MembresDeleteDialogComponent, MembresProjetComponent, MembresProjetAddComponent],
  entryComponents: [MembresDeleteDialogComponent]
})
export class GestionMembresModule {}
