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

  noResults: boolean = false; // ✅ MESSAGGIO

  // 👉 paginazione
  page = 1;
  pageSize = 6;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    this.loadUniversities('Italy');
  }

  onSearch(criteria: { country: string; name: string }): void {
    const country = criteria.country || 'Italy';
    const name = criteria.name?.trim() || '';
    this.loadUniversities(country, name);
  }

  resetFilters(): void {
    this.loadUniversities('Italy');
  }

  private loadUniversities(country: string, name?: string): void {
    this.page = 1; // reset pagina

    this.universityService.searchUniversities(country, name).subscribe({
      next: (data: ApiUniversity[]) => {
        this.universities = data.map(u => ({
          country: u.country,
          domain: u.domains?.[0] || '',
          name: u.name,
          website: (u.web_pages?.[0] || '').replace(/^https?:\/\//, '')
        }));

        this.noResults = this.universities.length === 0; // ✅ MESSAGGIO
      },
      error: (err: unknown) => {
        console.error('Errore nel caricamento delle università', err);
        this.universities = [];
        this.noResults = true; // ✅ MESSAGGIO
      }
    });
  }

  get totalPages(): number {
    if (this.universities.length === 0) {
      return 1;
    }
    return Math.ceil(this.universities.length / this.pageSize);
  }

  get paginatedUniversities() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.universities.slice(startIndex, endIndex);
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
}

