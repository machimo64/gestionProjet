import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeNotification } from 'app/shared/model/type-notification.model';

@Component({
  selector: 'jhi-type-notification-detail',
  templateUrl: './type-notification-detail.component.html'
})
export class TypeNotificationDetailComponent implements OnInit {
  typeNotification: ITypeNotification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeNotification }) => (this.typeNotification = typeNotification));
  }

  previousState(): void {
    window.history.back();
  }
}
