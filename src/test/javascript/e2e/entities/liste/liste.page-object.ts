import { element, by, ElementFinder } from 'protractor';

export class ListeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-liste div table .btn-danger'));
  title = element.all(by.css('jhi-liste div h2#page-heading span')).first();
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

export class ListeUpdatePage {
  pageTitle = element(by.id('jhi-liste-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titreInput = element(by.id('field_titre'));
  positionInput = element(by.id('field_position'));

  projetSelect = element(by.id('field_projet'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitreInput(titre: string): Promise<void> {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput(): Promise<string> {
    return await this.titreInput.getAttribute('value');
  }

  async setPositionInput(position: string): Promise<void> {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput(): Promise<string> {
    return await this.positionInput.getAttribute('value');
  }

  async projetSelectLastOption(): Promise<void> {
    await this.projetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetSelectOption(option: string): Promise<void> {
    await this.projetSelect.sendKeys(option);
  }

  getProjetSelect(): ElementFinder {
    return this.projetSelect;
  }

  async getProjetSelectedOption(): Promise<string> {
    return await this.projetSelect.element(by.css('option:checked')).getText();
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

export class ListeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-liste-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-liste'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
