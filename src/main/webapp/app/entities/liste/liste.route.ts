import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IListe, Liste } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';
import { ListeComponent } from './liste.component';
import { ListeDetailComponent } from './liste-detail.component';
import { ListeUpdateComponent } from './liste-update.component';
import {ListeNewTacheComponent} from "app/entities/liste/liste-new-tache.component";

@Injectable({ providedIn: 'root' })
export class ListeResolve implements Resolve<IListe> {
  constructor(private service: ListeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IListe> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((liste: HttpResponse<Liste>) => {
          if (liste.body) {
            return of(liste.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Liste());
  }
}

export const listeRoute: Routes = [
  {
    path: '',
    component: ListeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListeDetailComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListeUpdateComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/newTache',
    component: ListeNewTacheComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListeUpdateComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
