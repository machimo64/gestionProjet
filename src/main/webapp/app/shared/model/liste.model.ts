import { IProjet } from 'app/shared/model/projet.model';

export interface IListe {
  id?: number;
  titre?: string;
  position?: number;
  projet?: IProjet;
}

export class Liste implements IListe {
  constructor(public id?: number, public titre?: string, public position?: number, public projet?: IProjet) {}
}
