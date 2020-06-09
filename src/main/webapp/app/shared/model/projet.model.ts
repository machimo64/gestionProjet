import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IProjet {
  id?: number;
  titre?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  description?: string;
  etat?: boolean;
  user?: IUser;
  model?: string;
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public titre?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public description?: string,
    public etat?: boolean,
    public user?: IUser,
    public model?: string
  ) {
    this.etat = this.etat || false;
  }
}
