import { Component, EventEmitter, Output } from '@angular/core';   // Output/EventEmitter per comunicare col componente padre
import { FormsModule } from '@angular/forms';                      // necessario per usare [(ngModel)]
import { CommonModule } from '@angular/common';                    // *ngIf, *ngFor, e altre direttive base

@Component({
  selector: 'app-header',                                          // tag <app-header>
  standalone: true,                                                // componente standalone
  imports: [FormsModule, CommonModule],                            // moduli usati nel template (ngModel, *ngIf, *ngFor)
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  @Output() search = new EventEmitter<{ country: string; name: string }>(); // evento per inviare criteri di ricerca al padre
  @Output() reset = new EventEmitter<void>();                                 // evento per resettare i filtri
  @Output() showFavorites = new EventEmitter<void>();                         // evento per mostrare i preferiti
  @Output() backHome = new EventEmitter<void>();                              // evento per tornare alla vista normale

  searchTerm: string = '';                                                    // testo inserito nella barra di ricerca
  selectedCountry: string = 'All';                                            // paese selezionato nella select

  showingFavorites: boolean = false;                                          // true se l'header è in modalità "preferiti"

  countries: string[] = [                                                     // lista paesi per la select
    'All',
    'Italy',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Canada',
    'Australia'
  ];

  onSearchClick(): void {
    this.showingFavorites = false;                                            // esco dalla vista preferiti
    this.search.emit({
      name: this.searchTerm,                                                  // passo il testo cercato
      country: this.selectedCountry                                           // passo il paese selezionato
    });
  }

  onCountryChange(): void {
    this.showingFavorites = false;                                            // assicuro vista normale
    this.search.emit({
      name: this.searchTerm,                                                  // mantengo il testo
      country: this.selectedCountry                                           // aggiorno il paese
    });
  }

  onResetClick(): void {
    this.searchTerm = '';                                                     // svuoto la barra di ricerca
    this.selectedCountry = 'All';                                             // resetto il paese su "All"
    this.showingFavorites = false;                                            // torno alla vista normale
    this.reset.emit();                                                        // avviso il padre di resettare
  }

  onFavoritesClick(): void {
    this.showingFavorites = true;                                             // attivo la modalità "preferiti"
    this.showFavorites.emit();                                                // notifico il padre di mostrare i preferiti
  }

  onBackToHomeClick(): void {
    this.showingFavorites = false;                                            // disattivo modalità "preferiti"
    this.backHome.emit();                                                     // chiedo al padre di tornare alla lista normale
  }
}
