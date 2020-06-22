import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeNotification, TypeNotification } from 'app/shared/model/type-notification.model';
import { TypeNotificationService } from './type-notification.service';
import { TypeNotificationComponent } from './type-notification.component';
import { TypeNotificationDetailComponent } from './type-notification-detail.component';
import { TypeNotificationUpdateComponent } from './type-notification-update.component';

@Injectable({ providedIn: 'root' })
export class TypeNotificationResolve implements Resolve<ITypeNotification> {
  constructor(private service: TypeNotificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeNotification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeNotification: HttpResponse<TypeNotification>) => {
          if (typeNotification.body) {
            return of(typeNotification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeNotification());
  }
}

export const typeNotificationRoute: Routes = [
  {
    path: '',
    component: TypeNotificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.typeNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeNotificationDetailComponent,
    resolve: {
      typeNotification: TypeNotificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.typeNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeNotificationUpdateComponent,
    resolve: {
      typeNotification: TypeNotificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.typeNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeNotificationUpdateComponent,
    resolve: {
      typeNotification: TypeNotificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.typeNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
