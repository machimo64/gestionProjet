import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMembres } from 'app/shared/model/membres.model';

type EntityResponseType = HttpResponse<IMembres>;
type EntityArrayResponseType = HttpResponse<IMembres[]>;

@Injectable({ providedIn: 'root' })
export class MembresService {
  public resourceUrl = SERVER_API_URL + 'api/membres';

  constructor(protected http: HttpClient) {}

  create(membres: IMembres): Observable<EntityResponseType> {
    return this.http.post<IMembres>(this.resourceUrl, membres, { observe: 'response' });
  }

  update(membres: IMembres): Observable<EntityResponseType> {
    return this.http.put<IMembres>(this.resourceUrl, membres, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembres>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembres[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryIfMembre(idProjet: number): Observable<EntityResponseType> {
    return this.http.get<IMembres>(this.resourceUrl+"/ByUserAndProjet/"+idProjet, { observe: 'response' });
  }

  queryByProjet(idProjet : number,req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembres[]>(this.resourceUrl+"/ByProjet/"+idProjet, { params: options, observe: 'response' });
  }

  // Requête qui permet de récuperer les membres d'un projet ne participant pas à une tâche
  queryByNotTache(idTache : number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembres[]>(this.resourceUrl+"/ByNotTache/"+idTache, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
