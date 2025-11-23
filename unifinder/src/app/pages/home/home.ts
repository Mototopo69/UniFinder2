import { Component, OnInit } from '@angular/core';                       // OnInit per usare ngOnInit
import { HeaderComponent } from '../../components/header/header';        // componente header
import { UniversityCardComponent } from '../../components/university-card/university-card'; // componente card università
import { NgFor, NgIf } from '@angular/common';                           // direttive strutturali *ngFor e *ngIf
import { UniversityService, ApiUniversity } from '../../services/university'; // servizio per chiamare API universitarie

@Component({
  selector: 'app-home',                                                  // tag <app-home>
  standalone: true,                                                      // componente standalone
  imports: [HeaderComponent, UniversityCardComponent, NgFor, NgIf],      // componenti e direttive usate nel template
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  universities: {
    country: string;
    domain: string;
    name: string;
    website: string;
  }[] = [];                                                              // lista università mostrate (ricerca corrente)

  favorites: {
    country: string;
    domain: string;
    name: string;
    website: string;
  }[] = [];                                                              // lista università preferite

  noResults: boolean = false;                                            // true = mostra messaggio "nessuna università"
  page = 1;                                                              // pagina corrente (paginazione)
  pageSize = 6;                                                          // numero di card per pagina

  showingFavorites = false;                                              // true se sto mostrando i preferiti

  constructor(private universityService: UniversityService) {}           // inject del servizio per le API

  ngOnInit(): void {
    // Default: università italiane all'avvio
    this.loadUniversities('Italy');
  }

  // RICERCA (chiamata dal (search) dell'header)
  onSearch(criteria: { country: string; name: string }): void {
    this.showingFavorites = false;                                       // passo alla lista normale

    const rawCountry = criteria.country || 'All';
    // Se è "All" → niente filtro per paese
    const country = rawCountry === 'All' ? '' : rawCountry;              // stringa vuota = nessun filtro paese
    const name = criteria.name?.trim() || '';                            // tolgo spazi, se vuoto passo stringa vuota

    this.loadUniversities(country, name);                                // ricarico elenco da API
  }

  // RESET (chiamato dal (reset) dell'header)
  resetFilters(): void {
    this.page = 1;                                                       // ritorno a pagina 1
    this.noResults = false;
    this.showingFavorites = false;                                       // vista normale
    this.loadUniversities('Italy');                                      // ripristino università italiane
  }

  // MOSTRA SOLO PREFERITI (chiamato da (showFavorites))
  onShowFavorites(): void {
    this.showingFavorites = true;                                        // attivo modalità preferiti
    this.page = 1;

    // se non ci sono preferiti, mostro il messaggio di nessun risultato
    this.noResults = this.favorites.length === 0;
  }

  // TORNA ALLA LISTA NORMALE (chiamato da (backHome))
  onBackHome(): void {
    this.showingFavorites = false;                                       // disattivo vista preferiti
    this.page = 1;
    this.noResults = this.universities.length === 0;                     // se lista vuota, noResults true
  }

  // CHIAMATA API per caricare le università
  private loadUniversities(country: string, name?: string): void {
    this.page = 1;                                                       // ogni nuova ricerca riparte da pagina 1

    this.universityService.searchUniversities(country, name).subscribe({
      next: (data: ApiUniversity[]) => {                                 // risposta corretta dall'API
        this.universities = data.map(u => ({
          country: u.country,
          domain: u.domains?.[0] || '',                                  // primo dominio o stringa vuota
          name: u.name,
          website: (u.web_pages?.[0] || '').replace(/^https?:\/\//, '')  // tolgo http/https dall'URL
        }));

        if (!this.showingFavorites) {
          this.noResults = this.universities.length === 0;               // se nessuna università, segnalo noResults
        }
      },
      error: () => {
        this.universities = [];                                          // in errore svuoto lista
        if (!this.showingFavorites) {
          this.noResults = true;                                         // segnalo fallimento ricerca
        }
      }
    });
  }

  // LISTA CORRENTE (normale o preferiti)
  get currentList() {
    return this.showingFavorites ? this.favorites : this.universities;   // restituisce lista selezionata
  }

  // Numero totale di pagine in base alla lista corrente
  get totalPages(): number {
    const list = this.currentList;
    return list.length === 0 ? 1 : Math.ceil(list.length / this.pageSize);
  }

  // Sotto-lista di università della pagina corrente
  get paginatedUniversities() {
    const list = this.currentList;
    const startIndex = (this.page - 1) * this.pageSize;                  // calcolo indice iniziale
    return list.slice(startIndex, startIndex + this.pageSize);           // prendo solo un pezzo dell'array
  }

  // Vai alla pagina successiva (se esiste)
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  // Vai alla pagina precedente (se possibile)
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  // AGGIUNGI / TOGLI AI PREFERITI
  addToFavorites(uni: { country: string; domain: string; name: string; website: string }): void {
    const exists = this.favorites.some(f => f.name === uni.name && f.country === uni.country); // controllo duplicato
    if (!exists) {
      this.favorites.push({ ...uni });                                      // se non c'è già, la aggiungo
    } else {
      // se vuoi toggle: rimuovi se già presente
      this.favorites = this.favorites.filter(f => !(f.name === uni.name && f.country === uni.country)); // rimuovo
    }
  }
}
