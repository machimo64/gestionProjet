import { element, by, ElementFinder } from 'protractor';

export class MembresComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-membres div table .btn-danger'));
  title = element.all(by.css('jhi-membres div h2#page-heading span')).first();
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

export class MembresUpdatePage {
  pageTitle = element(by.id('jhi-membres-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  roleSelect = element(by.id('field_role'));

  userSelect = element(by.id('field_user'));
  projetSelect = element(by.id('field_projet'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRoleSelect(role: string): Promise<void> {
    await this.roleSelect.sendKeys(role);
  }

  async getRoleSelect(): Promise<string> {
    return await this.roleSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption(): Promise<void> {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class MembresDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-membres-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-membres'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
