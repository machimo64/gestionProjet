import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { ListeComponent } from 'app/entities/liste/liste.component';
import { ListeService } from 'app/entities/liste/liste.service';
import { Liste } from 'app/shared/model/liste.model';

describe('Component Tests', () => {
  describe('Liste Management Component', () => {
    let comp: ListeComponent;
    let fixture: ComponentFixture<ListeComponent>;
    let service: ListeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [ListeComponent]
      })
        .overrideTemplate(ListeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Liste(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.listes && comp.listes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
