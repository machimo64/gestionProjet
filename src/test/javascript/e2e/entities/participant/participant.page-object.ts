import { element, by, ElementFinder } from 'protractor';

export class ParticipantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-participant div table .btn-danger'));
  title = element.all(by.css('jhi-participant div h2#page-heading span')).first();
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

export class ParticipantUpdatePage {
  pageTitle = element(by.id('jhi-participant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  userSelect = element(by.id('field_user'));
  tacheSelect = element(by.id('field_tache'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

export class ParticipantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-participant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-participant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
