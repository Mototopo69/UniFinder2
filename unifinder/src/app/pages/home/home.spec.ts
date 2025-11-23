import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';                             // componente da testare

describe('Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]                                      // import del componente standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);               // crea il componente
    component = fixture.componentInstance;                          // istanza della classe
    fixture.detectChanges();                                        // aggiorna template
  });

  it('should create', () => {                                       // test base
    expect(component).toBeTruthy();
  });
});
