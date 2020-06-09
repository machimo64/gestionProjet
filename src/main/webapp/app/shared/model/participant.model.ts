import { IUser } from 'app/core/user/user.model';
import { ITache } from 'app/shared/model/tache.model';

export interface IParticipant {
  id?: number;
  user?: IUser;
  tache?: ITache;
}

export class Participant implements IParticipant {
  constructor(public id?: number, public user?: IUser, public tache?: ITache) {}
}
