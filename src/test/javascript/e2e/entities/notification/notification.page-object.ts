import { element, by, ElementFinder } from 'protractor';

export class NotificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-notification div table .btn-danger'));
  title = element.all(by.css('jhi-notification div h2#page-heading span')).first();
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

export class NotificationUpdatePage {
  pageTitle = element(by.id('jhi-notification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  emetteurSelect = element(by.id('field_emetteur'));
  destinataireSelect = element(by.id('field_destinataire'));
  typeNotificationSelect = element(by.id('field_typeNotification'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async emetteurSelectLastOption(): Promise<void> {
    await this.emetteurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async emetteurSelectOption(option: string): Promise<void> {
    await this.emetteurSelect.sendKeys(option);
  }

  getEmetteurSelect(): ElementFinder {
    return this.emetteurSelect;
  }

  async getEmetteurSelectedOption(): Promise<string> {
    return await this.emetteurSelect.element(by.css('option:checked')).getText();
  }

  async destinataireSelectLastOption(): Promise<void> {
    await this.destinataireSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async destinataireSelectOption(option: string): Promise<void> {
    await this.destinataireSelect.sendKeys(option);
  }

  getDestinataireSelect(): ElementFinder {
    return this.destinataireSelect;
  }

  async getDestinataireSelectedOption(): Promise<string> {
    return await this.destinataireSelect.element(by.css('option:checked')).getText();
  }

  async typeNotificationSelectLastOption(): Promise<void> {
    await this.typeNotificationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async typeNotificationSelectOption(option: string): Promise<void> {
    await this.typeNotificationSelect.sendKeys(option);
  }

  getTypeNotificationSelect(): ElementFinder {
    return this.typeNotificationSelect;
  }

  async getTypeNotificationSelectedOption(): Promise<string> {
    return await this.typeNotificationSelect.element(by.css('option:checked')).getText();
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

export class NotificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-notification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-notification'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
