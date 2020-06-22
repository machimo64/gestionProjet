import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeNotification } from 'app/shared/model/type-notification.model';

type EntityResponseType = HttpResponse<ITypeNotification>;
type EntityArrayResponseType = HttpResponse<ITypeNotification[]>;

@Injectable({ providedIn: 'root' })
export class TypeNotificationService {
  public resourceUrl = SERVER_API_URL + 'api/type-notifications';

  constructor(protected http: HttpClient) {}

  create(typeNotification: ITypeNotification): Observable<EntityResponseType> {
    return this.http.post<ITypeNotification>(this.resourceUrl, typeNotification, { observe: 'response' });
  }

  update(typeNotification: ITypeNotification): Observable<EntityResponseType> {
    return this.http.put<ITypeNotification>(this.resourceUrl, typeNotification, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeNotification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeNotification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
