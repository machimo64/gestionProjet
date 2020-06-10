import { element, by, ElementFinder } from 'protractor';

export class CommentaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commentaire div table .btn-danger'));
  title = element.all(by.css('jhi-commentaire div h2#page-heading span')).first();
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

export class CommentaireUpdatePage {
  pageTitle = element(by.id('jhi-commentaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  contenuInput = element(by.id('field_contenu'));
  dateHeureInput = element(by.id('field_dateHeure'));

  userSelect = element(by.id('field_user'));
  tacheSelect = element(by.id('field_tache'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContenuInput(contenu: string): Promise<void> {
    await this.contenuInput.sendKeys(contenu);
  }

  async getContenuInput(): Promise<string> {
    return await this.contenuInput.getAttribute('value');
  }

  async setDateHeureInput(dateHeure: string): Promise<void> {
    await this.dateHeureInput.sendKeys(dateHeure);
  }

  async getDateHeureInput(): Promise<string> {
    return await this.dateHeureInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async tacheSelectLastOption(): Promise<void> {
    await this.tacheSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tacheSelectOption(option: string): Promise<void> {
    await this.tacheSelect.sendKeys(option);
  }

  getTacheSelect(): ElementFinder {
    return this.tacheSelect;
  }

  async getTacheSelectedOption(): Promise<string> {
    return await this.tacheSelect.element(by.css('option:checked')).getText();
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

export class CommentaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commentaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commentaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
