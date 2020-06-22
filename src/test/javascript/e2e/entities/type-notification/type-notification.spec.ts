import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TypeNotificationComponentsPage, TypeNotificationDeleteDialog, TypeNotificationUpdatePage } from './type-notification.page-object';

const expect = chai.expect;

describe('TypeNotification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeNotificationComponentsPage: TypeNotificationComponentsPage;
  let typeNotificationUpdatePage: TypeNotificationUpdatePage;
  let typeNotificationDeleteDialog: TypeNotificationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TypeNotifications', async () => {
    await navBarPage.goToEntity('type-notification');
    typeNotificationComponentsPage = new TypeNotificationComponentsPage();
    await browser.wait(ec.visibilityOf(typeNotificationComponentsPage.title), 5000);
    expect(await typeNotificationComponentsPage.getTitle()).to.eq('gestionApp.typeNotification.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(typeNotificationComponentsPage.entities), ec.visibilityOf(typeNotificationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TypeNotification page', async () => {
    await typeNotificationComponentsPage.clickOnCreateButton();
    typeNotificationUpdatePage = new TypeNotificationUpdatePage();
    expect(await typeNotificationUpdatePage.getPageTitle()).to.eq('gestionApp.typeNotification.home.createOrEditLabel');
    await typeNotificationUpdatePage.cancel();
  });

  it('should create and save TypeNotifications', async () => {
    const nbButtonsBeforeCreate = await typeNotificationComponentsPage.countDeleteButtons();

    await typeNotificationComponentsPage.clickOnCreateButton();

    await promise.all([typeNotificationUpdatePage.setNomInput('nom'), typeNotificationUpdatePage.setContenuInput('contenu')]);

    expect(await typeNotificationUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await typeNotificationUpdatePage.getContenuInput()).to.eq('contenu', 'Expected Contenu value to be equals to contenu');

    await typeNotificationUpdatePage.save();
    expect(await typeNotificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await typeNotificationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TypeNotification', async () => {
    const nbButtonsBeforeDelete = await typeNotificationComponentsPage.countDeleteButtons();
    await typeNotificationComponentsPage.clickOnLastDeleteButton();

    typeNotificationDeleteDialog = new TypeNotificationDeleteDialog();
    expect(await typeNotificationDeleteDialog.getDialogTitle()).to.eq('gestionApp.typeNotification.delete.question');
    await typeNotificationDeleteDialog.clickOnConfirmButton();

    expect(await typeNotificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
