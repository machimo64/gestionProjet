import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProjetComponentsPage,
  /* ProjetDeleteDialog, */
  ProjetUpdatePage
} from './projet.page-object';

const expect = chai.expect;

describe('Projet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projetComponentsPage: ProjetComponentsPage;
  let projetUpdatePage: ProjetUpdatePage;
  /* let projetDeleteDialog: ProjetDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Projets', async () => {
    await navBarPage.goToEntity('projet');
    projetComponentsPage = new ProjetComponentsPage();
    await browser.wait(ec.visibilityOf(projetComponentsPage.title), 5000);
    expect(await projetComponentsPage.getTitle()).to.eq('gestionApp.projet.home.title');
    await browser.wait(ec.or(ec.visibilityOf(projetComponentsPage.entities), ec.visibilityOf(projetComponentsPage.noResult)), 1000);
  });

  it('should load create Projet page', async () => {
    await projetComponentsPage.clickOnCreateButton();
    projetUpdatePage = new ProjetUpdatePage();
    expect(await projetUpdatePage.getPageTitle()).to.eq('gestionApp.projet.home.createOrEditLabel');
    await projetUpdatePage.cancel();
  });

  /* it('should create and save Projets', async () => {
        const nbButtonsBeforeCreate = await projetComponentsPage.countDeleteButtons();

        await projetComponentsPage.clickOnCreateButton();

        await promise.all([
            projetUpdatePage.setTitreInput('titre'),
            projetUpdatePage.setDateDebutInput('2000-12-31'),
            projetUpdatePage.setDateFinInput('2000-12-31'),
            projetUpdatePage.setDescriptionInput('description'),
            projetUpdatePage.userSelectLastOption(),
        ]);

        expect(await projetUpdatePage.getTitreInput()).to.eq('titre', 'Expected Titre value to be equals to titre');
        expect(await projetUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
        expect(await projetUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');
        expect(await projetUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        const selectedEtat = projetUpdatePage.getEtatInput();
        if (await selectedEtat.isSelected()) {
            await projetUpdatePage.getEtatInput().click();
            expect(await projetUpdatePage.getEtatInput().isSelected(), 'Expected etat not to be selected').to.be.false;
        } else {
            await projetUpdatePage.getEtatInput().click();
            expect(await projetUpdatePage.getEtatInput().isSelected(), 'Expected etat to be selected').to.be.true;
        }

        await projetUpdatePage.save();
        expect(await projetUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await projetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Projet', async () => {
        const nbButtonsBeforeDelete = await projetComponentsPage.countDeleteButtons();
        await projetComponentsPage.clickOnLastDeleteButton();

        projetDeleteDialog = new ProjetDeleteDialog();
        expect(await projetDeleteDialog.getDialogTitle())
            .to.eq('gestionApp.projet.delete.question');
        await projetDeleteDialog.clickOnConfirmButton();

        expect(await projetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
