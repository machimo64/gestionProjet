import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { TypeNotificationUpdateComponent } from 'app/entities/type-notification/type-notification-update.component';
import { TypeNotificationService } from 'app/entities/type-notification/type-notification.service';
import { TypeNotification } from 'app/shared/model/type-notification.model';

describe('Component Tests', () => {
  describe('TypeNotification Management Update Component', () => {
    let comp: TypeNotificationUpdateComponent;
    let fixture: ComponentFixture<TypeNotificationUpdateComponent>;
    let service: TypeNotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [TypeNotificationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TypeNotificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeNotificationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeNotificationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeNotification(123);
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
        const entity = new TypeNotification();
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
