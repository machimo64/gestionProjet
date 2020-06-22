import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { FichierComponent } from 'app/entities/fichier/fichier.component';
import { FichierService } from 'app/entities/fichier/fichier.service';
import { Fichier } from 'app/shared/model/fichier.model';

describe('Component Tests', () => {
  describe('Fichier Management Component', () => {
    let comp: FichierComponent;
    let fixture: ComponentFixture<FichierComponent>;
    let service: FichierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [FichierComponent]
      })
        .overrideTemplate(FichierComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichierComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichierService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fichier(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fichiers && comp.fichiers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
