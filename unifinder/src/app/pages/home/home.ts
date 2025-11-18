import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { UniversityCardComponent } from '../../components/university-card/university-card';
import { NgFor, NgIf } from '@angular/common';
import { UniversityService, ApiUniversity } from '../../services/university';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UniversityCardComponent, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  universities: {
    country: string;
    domain: string;
    name: string;
    website: string;
  }[] = [];

  favorites: {
    country: string;
    domain: string;
    name: string;
    website: string;
  }[] = [];

  noResults: boolean = false;
  page = 1;
  pageSize = 6;

  showingFavorites = false;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    // Default: università italiane
    this.loadUniversities('Italy');
  }

  // 🔎 RICERCA (chiamata dal (search) dell'header)
  onSearch(criteria: { country: string; name: string }): void {
    this.showingFavorites = false;

    const rawCountry = criteria.country || 'All';
    // Se è "All" → niente filtro per paese
    const country = rawCountry === 'All' ? '' : rawCountry;
    const name = criteria.name?.trim() || '';

    this.loadUniversities(country, name);
  }

  // 🔄 RESET (chiamato dal (reset) dell'header)
  resetFilters(): void {
    this.page = 1;
    this.noResults = false;
    this.showingFavorites = false;
    this.loadUniversities('Italy');
  }

  // ❤️ MOSTRA SOLO PREFERITI (se lo usi nell'header)
  onShowFavorites(): void {
    this.showingFavorites = true;
    this.page = 1;

    // se usi un servizio esterno per i preferiti,
    // qui potresti ricaricarli da lì.
    // per ora usiamo l'array "favorites" locale.
    this.noResults = this.favorites.length === 0;
  }

  // ⬅ TORNA ALLA LISTA NORMALE
  onBackHome(): void {
    this.showingFavorites = false;
    this.page = 1;
    this.noResults = this.universities.length === 0;
  }

  // 📡 CHIAMATA API
  private loadUniversities(country: string, name?: string): void {
    this.page = 1;

    this.universityService.searchUniversities(country, name).subscribe({
      next: (data: ApiUniversity[]) => {
        this.universities = data.map(u => ({
          country: u.country,
          domain: u.domains?.[0] || '',
          name: u.name,
          website: (u.web_pages?.[0] || '').replace(/^https?:\/\//, '')
        }));

        if (!this.showingFavorites) {
          this.noResults = this.universities.length === 0;
        }
      },
      error: () => {
        this.universities = [];
        if (!this.showingFavorites) {
          this.noResults = true;
        }
      }
    });
  }

  // ===== LISTA CORRENTE (normale o preferiti) =====
  get currentList() {
    return this.showingFavorites ? this.favorites : this.universities;
  }

  get totalPages(): number {
    const list = this.currentList;
    return list.length === 0 ? 1 : Math.ceil(list.length / this.pageSize);
  }

  get paginatedUniversities() {
    const list = this.currentList;
    const startIndex = (this.page - 1) * this.pageSize;
    return list.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  // ❤️ AGGIUNGI AI PREFERITI (se la card emette addFavorite)
  addToFavorites(uni: { country: string; domain: string; name: string; website: string }): void {
    const exists = this.favorites.some(f => f.name === uni.name && f.country === uni.country);
    if (!exists) {
      this.favorites.push({ ...uni });
    } else {
      // se vuoi toggle: rimuovi se già presente
      this.favorites = this.favorites.filter(f => !(f.name === uni.name && f.country === uni.country));
    }
  }
}
