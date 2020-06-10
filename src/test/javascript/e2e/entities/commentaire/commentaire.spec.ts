import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  CommentaireComponentsPage,
  /* CommentaireDeleteDialog, */
  CommentaireUpdatePage
} from './commentaire.page-object';

const expect = chai.expect;

describe('Commentaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentaireComponentsPage: CommentaireComponentsPage;
  let commentaireUpdatePage: CommentaireUpdatePage;
  /* let commentaireDeleteDialog: CommentaireDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Commentaires', async () => {
    await navBarPage.goToEntity('commentaire');
    commentaireComponentsPage = new CommentaireComponentsPage();
    await browser.wait(ec.visibilityOf(commentaireComponentsPage.title), 5000);
    expect(await commentaireComponentsPage.getTitle()).to.eq('gestionApp.commentaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(commentaireComponentsPage.entities), ec.visibilityOf(commentaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Commentaire page', async () => {
    await commentaireComponentsPage.clickOnCreateButton();
    commentaireUpdatePage = new CommentaireUpdatePage();
    expect(await commentaireUpdatePage.getPageTitle()).to.eq('gestionApp.commentaire.home.createOrEditLabel');
    await commentaireUpdatePage.cancel();
  });

  /* it('should create and save Commentaires', async () => {
        const nbButtonsBeforeCreate = await commentaireComponentsPage.countDeleteButtons();

        await commentaireComponentsPage.clickOnCreateButton();

        await promise.all([
            commentaireUpdatePage.setContenuInput('contenu'),
            commentaireUpdatePage.setDateHeureInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            commentaireUpdatePage.userSelectLastOption(),
            commentaireUpdatePage.tacheSelectLastOption(),
        ]);

        expect(await commentaireUpdatePage.getContenuInput()).to.eq('contenu', 'Expected Contenu value to be equals to contenu');
        expect(await commentaireUpdatePage.getDateHeureInput()).to.contain('2001-01-01T02:30', 'Expected dateHeure value to be equals to 2000-12-31');

        await commentaireUpdatePage.save();
        expect(await commentaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await commentaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Commentaire', async () => {
        const nbButtonsBeforeDelete = await commentaireComponentsPage.countDeleteButtons();
        await commentaireComponentsPage.clickOnLastDeleteButton();

        commentaireDeleteDialog = new CommentaireDeleteDialog();
        expect(await commentaireDeleteDialog.getDialogTitle())
            .to.eq('gestionApp.commentaire.delete.question');
        await commentaireDeleteDialog.clickOnConfirmButton();

        expect(await commentaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
