import { IMembres } from 'app/shared/model/membres.model';
import { ITache } from 'app/shared/model/tache.model';

export interface IFichier {
  id?: number;
  fichierContentType?: string;
  fichier?: any;
  membres?: IMembres;
  tache?: ITache;
}

export class Fichier implements IFichier {
  constructor(
    public id?: number,
    public fichierContentType?: string,
    public fichier?: any,
    public membres?: IMembres,
    public tache?: ITache
  ) {}
}
