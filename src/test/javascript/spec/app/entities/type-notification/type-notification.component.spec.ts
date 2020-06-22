import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { TypeNotificationComponent } from 'app/entities/type-notification/type-notification.component';
import { TypeNotificationService } from 'app/entities/type-notification/type-notification.service';
import { TypeNotification } from 'app/shared/model/type-notification.model';

describe('Component Tests', () => {
  describe('TypeNotification Management Component', () => {
    let comp: TypeNotificationComponent;
    let fixture: ComponentFixture<TypeNotificationComponent>;
    let service: TypeNotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [TypeNotificationComponent]
      })
        .overrideTemplate(TypeNotificationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeNotificationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeNotificationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeNotification(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeNotifications && comp.typeNotifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
