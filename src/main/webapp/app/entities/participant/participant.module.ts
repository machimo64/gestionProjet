import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared/shared.module';
import { ParticipantComponent } from './participant.component';
import { ParticipantDetailComponent } from './participant-detail.component';
import { ParticipantUpdateComponent } from './participant-update.component';
import { ParticipantDeleteDialogComponent } from './participant-delete-dialog.component';
import { participantRoute } from './participant.route';
import {ParticipantTacheAddComponent} from "app/entities/participant/participant-tache-add.component";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(participantRoute), MatTableModule, MatFormFieldModule, MatInputModule],
  declarations: [ParticipantComponent, ParticipantDetailComponent, ParticipantUpdateComponent, ParticipantDeleteDialogComponent, ParticipantTacheAddComponent],
  entryComponents: [ParticipantDeleteDialogComponent]
})
export class GestionParticipantModule {}
