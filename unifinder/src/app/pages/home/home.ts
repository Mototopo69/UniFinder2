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

  noResults: boolean = false;

  // PAGINAZIONE
  page = 1;
  pageSize = 6;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    // stato iniziale: Italia
    this.loadUniversities('Italy');
  }

  // RICEVE L'EVENTO DI CERCA DALL'HEADER
  onSearch(criteria: { country: string; name: string }): void {
    let country = criteria.country || 'All';
    const name = criteria.name?.trim() || '';

    // 👉 Se l'utente ha selezionato "All" ma non ha scritto niente,
    // carichiamo l'Italia come default così NON resta vuoto
    if (country === 'All' && !name) {
      country = 'Italy';
    }

    this.loadUniversities(country, name);
  }

  // RESET DAL BOTTONE RESET DELL'HEADER
  resetFilters(): void {
    this.page = 1;
    this.noResults = false;
    // torniamo al default: tutte le uni italiane
    this.loadUniversities('Italy', '');
  }

  // CHIAMATA API
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
    return this.universities.length === 0
      ? 1
      : Math.ceil(this.universities.length / this.pageSize);
  }

  get paginatedUniversities() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.universities.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }
}
