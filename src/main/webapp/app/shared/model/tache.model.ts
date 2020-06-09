import { Moment } from 'moment';
import { IListe } from 'app/shared/model/liste.model';

export interface ITache {
  id?: number;
  titre?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  description?: string;
  etat?: boolean;
  poids?: number;
  categorie?: string;
  position?: number;
  liste?: IListe;
}

export class Tache implements ITache {
  constructor(
    public id?: number,
    public titre?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public description?: string,
    public etat?: boolean,
    public poids?: number,
    public categorie?: string,
    public position?: number,
    public liste?: IListe
  ) {
    this.etat = this.etat || false;
  }
}
