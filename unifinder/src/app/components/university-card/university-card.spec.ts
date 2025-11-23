import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityCardComponent } from './university-card';        // componente da testare

describe('UniversityCard', () => {                                  // gruppo di test
  let component: UniversityCardComponent;
  let fixture: ComponentFixture<UniversityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityCardComponent]                             // import del componente standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityCardComponent);      // crea il componente
    component = fixture.componentInstance;                           // ottiene la classe
    fixture.detectChanges();                                         // aggiorna template
  });

  it('should create', () => {                                        // test semplice: esiste?
    expect(component).toBeTruthy();
  });
});
