import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { ParticipantComponent } from 'app/entities/participant/participant.component';
import { ParticipantService } from 'app/entities/participant/participant.service';
import { Participant } from 'app/shared/model/participant.model';

describe('Component Tests', () => {
  describe('Participant Management Component', () => {
    let comp: ParticipantComponent;
    let fixture: ComponentFixture<ParticipantComponent>;
    let service: ParticipantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionTestModule],
        declarations: [ParticipantComponent]
      })
        .overrideTemplate(ParticipantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParticipantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParticipantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Participant(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.participants && comp.participants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
