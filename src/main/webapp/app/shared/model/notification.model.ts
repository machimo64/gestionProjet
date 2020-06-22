import { IUser } from 'app/core/user/user.model';
import { ITypeNotification } from 'app/shared/model/type-notification.model';

export interface INotification {
  id?: number;
  emetteur?: IUser;
  destinataire?: IUser;
  typeNotification?: ITypeNotification;
}

export class Notification implements INotification {
  constructor(public id?: number, public emetteur?: IUser, public destinataire?: IUser, public typeNotification?: ITypeNotification) {}
}
