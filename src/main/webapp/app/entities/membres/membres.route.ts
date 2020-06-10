import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMembres, Membres } from 'app/shared/model/membres.model';
import { MembresService } from './membres.service';
import { MembresComponent } from './membres.component';
import { MembresDetailComponent } from './membres-detail.component';
import { MembresUpdateComponent } from './membres-update.component';
import {MembresProjetComponent} from "app/entities/membres/membres-projet.component";
import {MembresProjetAddComponent} from "app/entities/membres/membres-projet-add.component";

@Injectable({ providedIn: 'root' })
export class MembresResolve implements Resolve<IMembres> {
  constructor(private service: MembresService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMembres> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((membres: HttpResponse<Membres>) => {
          if (membres.body) {
            return of(membres.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Membres());
  }
}

export const membresRoute: Routes = [
  {
    path: '',
    component: MembresComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MembresDetailComponent,
    resolve: {
      membres: MembresResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MembresUpdateComponent,
    resolve: {
      membres: MembresResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MembresUpdateComponent,
    resolve: {
      membres: MembresResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'projet/:idProjet',
    component: MembresProjetComponent,
    resolve: {
      membres: MembresResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'projet/add/:idProjet',
    component: MembresProjetAddComponent,
    resolve: {
      membres: MembresResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.membres.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
