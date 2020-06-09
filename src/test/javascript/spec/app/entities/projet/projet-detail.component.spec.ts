import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ProjetDetailComponent } from 'app/entities/projet/projet-detail.component';
import { Projet } from 'app/shared/model/projet.model';

describe('Component Tests', () => {
  describe('Projet Management Detail Component', () => {
    let comp: ProjetDetailComponent;
    let fixture: ComponentFixture<ProjetDetailComponent>;
    const route = ({ data: of({ projet: new Projet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [ProjetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProjetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProjetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load projet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.projet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
