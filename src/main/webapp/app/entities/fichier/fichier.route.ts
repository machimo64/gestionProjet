import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFichier, Fichier } from 'app/shared/model/fichier.model';
import { FichierService } from './fichier.service';
import { FichierComponent } from './fichier.component';
import { FichierDetailComponent } from './fichier-detail.component';
import { FichierUpdateComponent } from './fichier-update.component';

@Injectable({ providedIn: 'root' })
export class FichierResolve implements Resolve<IFichier> {
  constructor(private service: FichierService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFichier> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fichier: HttpResponse<Fichier>) => {
          if (fichier.body) {
            return of(fichier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fichier());
  }
}

export const fichierRoute: Routes = [
  {
    path: '',
    component: FichierComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.fichier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FichierDetailComponent,
    resolve: {
      fichier: FichierResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.fichier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FichierUpdateComponent,
    resolve: {
      fichier: FichierResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.fichier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FichierUpdateComponent,
    resolve: {
      fichier: FichierResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionApp.fichier.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
