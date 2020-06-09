import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  MembresComponentsPage,
  /* MembresDeleteDialog, */
  MembresUpdatePage
} from './membres.page-object';

const expect = chai.expect;

describe('Membres e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let membresComponentsPage: MembresComponentsPage;
  let membresUpdatePage: MembresUpdatePage;
  /* let membresDeleteDialog: MembresDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Membres', async () => {
    await navBarPage.goToEntity('membres');
    membresComponentsPage = new MembresComponentsPage();
    await browser.wait(ec.visibilityOf(membresComponentsPage.title), 5000);
    expect(await membresComponentsPage.getTitle()).to.eq('gestionApp.membres.home.title');
    await browser.wait(ec.or(ec.visibilityOf(membresComponentsPage.entities), ec.visibilityOf(membresComponentsPage.noResult)), 1000);
  });

  it('should load create Membres page', async () => {
    await membresComponentsPage.clickOnCreateButton();
    membresUpdatePage = new MembresUpdatePage();
    expect(await membresUpdatePage.getPageTitle()).to.eq('gestionApp.membres.home.createOrEditLabel');
    await membresUpdatePage.cancel();
  });

  /* it('should create and save Membres', async () => {
        const nbButtonsBeforeCreate = await membresComponentsPage.countDeleteButtons();

        await membresComponentsPage.clickOnCreateButton();

        await promise.all([
            membresUpdatePage.roleSelectLastOption(),
            membresUpdatePage.userSelectLastOption(),
            membresUpdatePage.projetSelectLastOption(),
        ]);


        await membresUpdatePage.save();
        expect(await membresUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await membresComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Membres', async () => {
        const nbButtonsBeforeDelete = await membresComponentsPage.countDeleteButtons();
        await membresComponentsPage.clickOnLastDeleteButton();

        membresDeleteDialog = new MembresDeleteDialog();
        expect(await membresDeleteDialog.getDialogTitle())
            .to.eq('gestionApp.membres.delete.question');
        await membresDeleteDialog.clickOnConfirmButton();

        expect(await membresComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
