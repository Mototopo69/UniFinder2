import { ComponentFixture, TestBed } from '@angular/core/testing'; // strumenti per testare componenti Angular
import { HeaderComponent } from './header';                        // componente da testare

describe('Header', () => {                                         // gruppo di test per HeaderComponent
  let component: HeaderComponent;                                  // istanza del componente
  let fixture: ComponentFixture<HeaderComponent>;                  // wrapper che contiene template + logica

  beforeEach(async () => {                                         // eseguito prima di ogni test
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]                                   // import del componente standalone
    })
    .compileComponents();                                           // compila template + component

    fixture = TestBed.createComponent(HeaderComponent);            // crea istanza del componente
    component = fixture.componentInstance;                         // riferimento alla classe del componente
    fixture.detectChanges();                                       // avvia rilevamento modifiche Angular
  });

  it('should create', () => {                                      // test base: verifica creazione
    expect(component).toBeTruthy();                                // il componente esiste?
  });
});
