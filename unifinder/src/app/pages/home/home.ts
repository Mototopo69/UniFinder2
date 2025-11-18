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

  // PAGINAZIONE
  page = 1;
  pageSize = 6;

  showingFavorites = false;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    // default: Italia
    this.loadUniversities('Italy');
  }

  // 🔎 RICERCA UNIVERSITÀ
  onSearch(criteria: { country: string; name: string }): void {
    const country = criteria.country || 'All';
    const name = criteria.name?.trim() || '';

    this.showingFavorites = false;
    this.loadUniversities(country, name);
  }

  // 🔄 RESET FILTRI
  resetFilters(): void {
    this.page = 1;
    this.noResults = false;
    this.showingFavorites = false;
    this.loadUniversities('Italy');
  }

  // ❤️ MOSTRA PREFERITI
  onShowFavorites(): void {
    this.showingFavorites = true;
  }

  // ⬅ TORNA ALLA HOME
  onBackHome(): void {
    this.showingFavorites = false;
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

        this.noResults = this.universities.length === 0;
      },
      error: () => {
        this.universities = [];
        this.noResults = true;
      }
    });
  }

  // PAGINAZIONE
  get totalPages(): number {
    const list = this.currentList;
    return list.length === 0 ? 1 : Math.ceil(list.length / this.pageSize);
  }

  get currentList() {
    return this.showingFavorites ? this.favorites : this.universities;
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

  // ❤️ AGGIUNGI AI PREFERITI (richiamalo dalla card)
  addToFavorites(uni: any): void {
    if (!this.favorites.some(f => f.name === uni.name)) {
      this.favorites.push(uni);
    }
  }
  
}
