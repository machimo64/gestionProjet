import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { TypeNotificationDetailComponent } from 'app/entities/type-notification/type-notification-detail.component';
import { TypeNotification } from 'app/shared/model/type-notification.model';

describe('Component Tests', () => {
  describe('TypeNotification Management Detail Component', () => {
    let comp: TypeNotificationDetailComponent;
    let fixture: ComponentFixture<TypeNotificationDetailComponent>;
    const route = ({ data: of({ typeNotification: new TypeNotification(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [TypeNotificationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TypeNotificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeNotificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeNotification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeNotification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
