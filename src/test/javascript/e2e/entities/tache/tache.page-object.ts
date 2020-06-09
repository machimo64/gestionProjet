import { element, by, ElementFinder } from 'protractor';

export class TacheComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tache div table .btn-danger'));
  title = element.all(by.css('jhi-tache div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TacheUpdatePage {
  pageTitle = element(by.id('jhi-tache-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titreInput = element(by.id('field_titre'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));
  descriptionInput = element(by.id('field_description'));
  etatInput = element(by.id('field_etat'));
  poidsInput = element(by.id('field_poids'));
  categorieInput = element(by.id('field_categorie'));
  positionInput = element(by.id('field_position'));

  listeSelect = element(by.id('field_liste'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitreInput(titre: string): Promise<void> {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput(): Promise<string> {
    return await this.titreInput.getAttribute('value');
  }

  async setDateDebutInput(dateDebut: string): Promise<void> {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput(): Promise<string> {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin: string): Promise<void> {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput(): Promise<string> {
    return await this.dateFinInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  getEtatInput(): ElementFinder {
    return this.etatInput;
  }

  async setPoidsInput(poids: string): Promise<void> {
    await this.poidsInput.sendKeys(poids);
  }

  async getPoidsInput(): Promise<string> {
    return await this.poidsInput.getAttribute('value');
  }

  async setCategorieInput(categorie: string): Promise<void> {
    await this.categorieInput.sendKeys(categorie);
  }

  async getCategorieInput(): Promise<string> {
    return await this.categorieInput.getAttribute('value');
  }

  async setPositionInput(position: string): Promise<void> {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput(): Promise<string> {
    return await this.positionInput.getAttribute('value');
  }

  async listeSelectLastOption(): Promise<void> {
    await this.listeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listeSelectOption(option: string): Promise<void> {
    await this.listeSelect.sendKeys(option);
  }

  getListeSelect(): ElementFinder {
    return this.listeSelect;
  }

  async getListeSelectedOption(): Promise<string> {
    return await this.listeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TacheDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tache-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tache'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
