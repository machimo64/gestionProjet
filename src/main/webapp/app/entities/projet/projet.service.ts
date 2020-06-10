import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProjet } from 'app/shared/model/projet.model';

type EntityResponseType = HttpResponse<IProjet>;
type EntityArrayResponseType = HttpResponse<IProjet[]>;

@Injectable({ providedIn: 'root' })
export class ProjetService {
  public resourceUrl = SERVER_API_URL + 'api/projets';

  constructor(protected http: HttpClient) {}

  create(projet: IProjet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projet);
    return this.http
      .post<IProjet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projet: IProjet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projet);
    return this.http
      .put<IProjet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProjet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryMembre(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjet[]>(this.resourceUrl+"/ByMembre", { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryNotMembre(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjet[]>(this.resourceUrl+"/ByNotMembre", { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(projet: IProjet): IProjet {
    const copy: IProjet = Object.assign({}, projet, {
      dateDebut: projet.dateDebut && projet.dateDebut.isValid() ? projet.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: projet.dateFin && projet.dateFin.isValid() ? projet.dateFin.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projet: IProjet) => {
        projet.dateDebut = projet.dateDebut ? moment(projet.dateDebut) : undefined;
        projet.dateFin = projet.dateFin ? moment(projet.dateFin) : undefined;
      });
    }
    return res;
  }
}
