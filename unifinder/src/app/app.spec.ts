import { TestBed } from '@angular/core/testing';
import { App } from './app';                                         // componente principale

describe('App', () => {

  beforeEach(async () => {                                           // prima dei test
    await TestBed.configureTestingModule({
      imports: [App],                                                // import componente standalone
    }).compileComponents();
  });

  it('should create the app', () => {                                // test: il componente esiste?
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {                                  // test: controlla testo nell'HTML
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();                                         // aggiorna il DOM
    const compiled = fixture.nativeElement as HTMLElement;           // accede all'HTML generato
    expect(compiled.querySelector('h1')?.textContent)                // cerca un h1
      .toContain('Hello, unifinder');                                // verifica il contenuto
  });
});
