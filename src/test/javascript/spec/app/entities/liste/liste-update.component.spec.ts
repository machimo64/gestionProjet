import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ListeUpdateComponent } from 'app/entities/liste/liste-update.component';
import { ListeService } from 'app/entities/liste/liste.service';
import { Liste } from 'app/shared/model/liste.model';

describe('Component Tests', () => {
  describe('Liste Management Update Component', () => {
    let comp: ListeUpdateComponent;
    let fixture: ComponentFixture<ListeUpdateComponent>;
    let service: ListeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [ListeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Liste(123);
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
        const entity = new Liste();
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
