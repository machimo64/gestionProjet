import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { MembresComponent } from 'app/entities/membres/membres.component';
import { MembresService } from 'app/entities/membres/membres.service';
import { Membres } from 'app/shared/model/membres.model';

describe('Component Tests', () => {
  describe('Membres Management Component', () => {
    let comp: MembresComponent;
    let fixture: ComponentFixture<MembresComponent>;
    let service: MembresService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [MembresComponent]
      })
        .overrideTemplate(MembresComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MembresComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MembresService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Membres(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.membres && comp.membres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
