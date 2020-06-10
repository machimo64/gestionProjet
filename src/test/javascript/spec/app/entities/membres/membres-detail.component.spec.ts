import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { MembresDetailComponent } from 'app/entities/membres/membres-detail.component';
import { Membres } from 'app/shared/model/membres.model';

describe('Component Tests', () => {
  describe('Membres Management Detail Component', () => {
    let comp: MembresDetailComponent;
    let fixture: ComponentFixture<MembresDetailComponent>;
    const route = ({ data: of({ membres: new Membres(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [MembresDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MembresDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MembresDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load membres on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.membres).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
