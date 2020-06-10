import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { TacheDetailComponent } from 'app/entities/tache/tache-detail.component';
import { Tache } from 'app/shared/model/tache.model';

describe('Component Tests', () => {
  describe('Tache Management Detail Component', () => {
    let comp: TacheDetailComponent;
    let fixture: ComponentFixture<TacheDetailComponent>;
    const route = ({ data: of({ tache: new Tache(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [TacheDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TacheDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TacheDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tache on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tache).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
