import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { MembresUpdateComponent } from 'app/entities/membres/membres-update.component';
import { MembresService } from 'app/entities/membres/membres.service';
import { Membres } from 'app/shared/model/membres.model';

describe('Component Tests', () => {
  describe('Membres Management Update Component', () => {
    let comp: MembresUpdateComponent;
    let fixture: ComponentFixture<MembresUpdateComponent>;
    let service: MembresService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [MembresUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MembresUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MembresUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MembresService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Membres(123);
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
        const entity = new Membres();
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
