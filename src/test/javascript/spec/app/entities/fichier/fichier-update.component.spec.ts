import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FichierUpdateComponent } from 'app/entities/fichier/fichier-update.component';
import { FichierService } from 'app/entities/fichier/fichier.service';
import { Fichier } from 'app/shared/model/fichier.model';

describe('Component Tests', () => {
  describe('Fichier Management Update Component', () => {
    let comp: FichierUpdateComponent;
    let fixture: ComponentFixture<FichierUpdateComponent>;
    let service: FichierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [FichierUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FichierUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichierUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichierService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fichier(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fichier();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
