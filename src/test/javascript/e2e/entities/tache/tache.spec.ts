import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TacheComponentsPage,
  /* TacheDeleteDialog, */
  TacheUpdatePage
} from './tache.page-object';

const expect = chai.expect;

describe('Tache e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tacheComponentsPage: TacheComponentsPage;
  let tacheUpdatePage: TacheUpdatePage;
  /* let tacheDeleteDialog: TacheDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Taches', async () => {
    await navBarPage.goToEntity('tache');
    tacheComponentsPage = new TacheComponentsPage();
    await browser.wait(ec.visibilityOf(tacheComponentsPage.title), 5000);
    expect(await tacheComponentsPage.getTitle()).to.eq('gestionApp.tache.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tacheComponentsPage.entities), ec.visibilityOf(tacheComponentsPage.noResult)), 1000);
  });

  it('should load create Tache page', async () => {
    await tacheComponentsPage.clickOnCreateButton();
    tacheUpdatePage = new TacheUpdatePage();
    expect(await tacheUpdatePage.getPageTitle()).to.eq('gestionApp.tache.home.createOrEditLabel');
    await tacheUpdatePage.cancel();
  });

  /* it('should create and save Taches', async () => {
        const nbButtonsBeforeCreate = await tacheComponentsPage.countDeleteButtons();

        await tacheComponentsPage.clickOnCreateButton();

        await promise.all([
            tacheUpdatePage.setTitreInput('titre'),
            tacheUpdatePage.setDateDebutInput('2000-12-31'),
            tacheUpdatePage.setDateFinInput('2000-12-31'),
            tacheUpdatePage.setDescriptionInput('description'),
            tacheUpdatePage.setPoidsInput('5'),
            tacheUpdatePage.setCategorieInput('categorie'),
            tacheUpdatePage.setPositionInput('5'),
            tacheUpdatePage.listeSelectLastOption(),
        ]);

        expect(await tacheUpdatePage.getTitreInput()).to.eq('titre', 'Expected Titre value to be equals to titre');
        expect(await tacheUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
        expect(await tacheUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');
        expect(await tacheUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        const selectedEtat = tacheUpdatePage.getEtatInput();
        if (await selectedEtat.isSelected()) {
            await tacheUpdatePage.getEtatInput().click();
            expect(await tacheUpdatePage.getEtatInput().isSelected(), 'Expected etat not to be selected').to.be.false;
        } else {
            await tacheUpdatePage.getEtatInput().click();
            expect(await tacheUpdatePage.getEtatInput().isSelected(), 'Expected etat to be selected').to.be.true;
        }
        expect(await tacheUpdatePage.getPoidsInput()).to.eq('5', 'Expected poids value to be equals to 5');
        expect(await tacheUpdatePage.getCategorieInput()).to.eq('categorie', 'Expected Categorie value to be equals to categorie');
        expect(await tacheUpdatePage.getPositionInput()).to.eq('5', 'Expected position value to be equals to 5');

        await tacheUpdatePage.save();
        expect(await tacheUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await tacheComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Tache', async () => {
        const nbButtonsBeforeDelete = await tacheComponentsPage.countDeleteButtons();
        await tacheComponentsPage.clickOnLastDeleteButton();

        tacheDeleteDialog = new TacheDeleteDialog();
        expect(await tacheDeleteDialog.getDialogTitle())
            .to.eq('gestionApp.tache.delete.question');
        await tacheDeleteDialog.clickOnConfirmButton();

        expect(await tacheComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
