import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FichierComponentsPage,
  /* FichierDeleteDialog, */
  FichierUpdatePage
} from './fichier.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Fichier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fichierComponentsPage: FichierComponentsPage;
  let fichierUpdatePage: FichierUpdatePage;
  /* let fichierDeleteDialog: FichierDeleteDialog; */
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fichiers', async () => {
    await navBarPage.goToEntity('fichier');
    fichierComponentsPage = new FichierComponentsPage();
    await browser.wait(ec.visibilityOf(fichierComponentsPage.title), 5000);
    expect(await fichierComponentsPage.getTitle()).to.eq('gestionApp.fichier.home.title');
    await browser.wait(ec.or(ec.visibilityOf(fichierComponentsPage.entities), ec.visibilityOf(fichierComponentsPage.noResult)), 1000);
  });

  it('should load create Fichier page', async () => {
    await fichierComponentsPage.clickOnCreateButton();
    fichierUpdatePage = new FichierUpdatePage();
    expect(await fichierUpdatePage.getPageTitle()).to.eq('gestionApp.fichier.home.createOrEditLabel');
    await fichierUpdatePage.cancel();
  });

  /* it('should create and save Fichiers', async () => {
        const nbButtonsBeforeCreate = await fichierComponentsPage.countDeleteButtons();

        await fichierComponentsPage.clickOnCreateButton();

        await promise.all([
            fichierUpdatePage.setFichierInput(absolutePath),
            fichierUpdatePage.membresSelectLastOption(),
            fichierUpdatePage.tacheSelectLastOption(),
        ]);

        expect(await fichierUpdatePage.getFichierInput()).to.endsWith(fileNameToUpload, 'Expected Fichier value to be end with ' + fileNameToUpload);

        await fichierUpdatePage.save();
        expect(await fichierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await fichierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Fichier', async () => {
        const nbButtonsBeforeDelete = await fichierComponentsPage.countDeleteButtons();
        await fichierComponentsPage.clickOnLastDeleteButton();

        fichierDeleteDialog = new FichierDeleteDialog();
        expect(await fichierDeleteDialog.getDialogTitle())
            .to.eq('gestionApp.fichier.delete.question');
        await fichierDeleteDialog.clickOnConfirmButton();

        expect(await fichierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
