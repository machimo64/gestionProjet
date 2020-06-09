import { IUser } from 'app/core/user/user.model';
import { IProjet } from 'app/shared/model/projet.model';
import { Role } from 'app/shared/model/enumerations/role.model';

export interface IMembres {
  id?: number;
  role?: Role;
  user?: IUser;
  projet?: IProjet;
}

export class Membres implements IMembres {
  constructor(public id?: number, public role?: Role, public user?: IUser, public projet?: IProjet) {}
}
