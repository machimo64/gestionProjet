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
<<<<<<< HEAD
  modele?: string;
=======
  model?: string;
>>>>>>> e5b54f68d560a26fb1dbe81641749f0234d3a19d
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
<<<<<<< HEAD
    public modele?: string
=======
    public model?: string
>>>>>>> e5b54f68d560a26fb1dbe81641749f0234d3a19d
  ) {
    this.etat = this.etat || false;
  }
}
