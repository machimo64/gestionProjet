import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITache, Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';

@Injectable({ providedIn: 'root' })
export class TacheResolve implements Resolve<ITache> {
  constructor(private service: TacheService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITache> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tache: HttpResponse<Tache>) => {
          if (tache.body) {
            return of(tache.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tache());
  }
}

export const tacheRoute: Routes = [
  {
    path: '',
    component: TacheComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TacheDetailComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
