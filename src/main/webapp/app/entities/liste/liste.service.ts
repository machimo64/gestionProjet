import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IListe } from 'app/shared/model/liste.model';

type EntityResponseType = HttpResponse<IListe>;
type EntityArrayResponseType = HttpResponse<IListe[]>;

@Injectable({ providedIn: 'root' })
export class ListeService {
  public resourceUrl = SERVER_API_URL + 'api/listes';

  constructor(protected http: HttpClient) {}

  create(liste: IListe): Observable<EntityResponseType> {
    return this.http.post<IListe>(this.resourceUrl, liste, { observe: 'response' });
  }

  update(liste: IListe): Observable<EntityResponseType> {
    return this.http.put<IListe>(this.resourceUrl, liste, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IListe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryByProjet(idProjet : number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListe[]>(`${this.resourceUrl+"/ByProjet"}/${idProjet}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
