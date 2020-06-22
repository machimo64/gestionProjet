export interface ITypeNotification {
  id?: number;
  nom?: string;
  contenu?: string;
}

export class TypeNotification implements ITypeNotification {
  constructor(public id?: number, public nom?: string, public contenu?: string) {}
}
