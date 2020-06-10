import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITache } from 'app/shared/model/tache.model';

export interface ICommentaire {
  id?: number;
  contenu?: string;
  dateHeure?: Moment;
  user?: IUser;
  tache?: ITache;
}

export class Commentaire implements ICommentaire {
  constructor(public id?: number, public contenu?: string, public dateHeure?: Moment, public user?: IUser, public tache?: ITache) {}
}
