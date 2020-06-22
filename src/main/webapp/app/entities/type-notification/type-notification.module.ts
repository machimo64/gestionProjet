import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared/shared.module';
import { TypeNotificationComponent } from './type-notification.component';
import { TypeNotificationDetailComponent } from './type-notification-detail.component';
import { TypeNotificationUpdateComponent } from './type-notification-update.component';
import { TypeNotificationDeleteDialogComponent } from './type-notification-delete-dialog.component';
import { typeNotificationRoute } from './type-notification.route';

@NgModule({
  imports: [GestionSharedModule, RouterModule.forChild(typeNotificationRoute)],
  declarations: [
    TypeNotificationComponent,
    TypeNotificationDetailComponent,
    TypeNotificationUpdateComponent,
    TypeNotificationDeleteDialogComponent
  ],
  entryComponents: [TypeNotificationDeleteDialogComponent]
})
export class GestionTypeNotificationModule {}
