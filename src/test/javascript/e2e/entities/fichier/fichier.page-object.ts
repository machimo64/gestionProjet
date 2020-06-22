import { element, by, ElementFinder } from 'protractor';

export class FichierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fichier div table .btn-danger'));
  title = element.all(by.css('jhi-fichier div h2#page-heading span')).first();
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

export class FichierUpdatePage {
  pageTitle = element(by.id('jhi-fichier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fichierInput = element(by.id('file_fichier'));

  membresSelect = element(by.id('field_membres'));
  tacheSelect = element(by.id('field_tache'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFichierInput(fichier: string): Promise<void> {
    await this.fichierInput.sendKeys(fichier);
  }

  async getFichierInput(): Promise<string> {
    return await this.fichierInput.getAttribute('value');
  }

  async membresSelectLastOption(): Promise<void> {
    await this.membresSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async membresSelectOption(option: string): Promise<void> {
    await this.membresSelect.sendKeys(option);
  }

  getMembresSelect(): ElementFinder {
    return this.membresSelect;
  }

  async getMembresSelectedOption(): Promise<string> {
    return await this.membresSelect.element(by.css('option:checked')).getText();
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

export class FichierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fichier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fichier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
