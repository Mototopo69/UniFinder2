import { TestBed } from '@angular/core/testing';
import { UniversityService } from './university';                   // servizio da testare

describe('University', () => {                                      // gruppo di test del servizio
  let service: UniversityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});                             // modulo di test vuoto (usa provider root)
    service = TestBed.inject(UniversityService);                    // ottiene il servizio da DI
  });

  it('should be created', () => {                                   // test: il servizio viene creato?
    expect(service).toBeTruthy();
  });
});
