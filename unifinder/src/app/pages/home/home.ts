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

  // 👉 paginazione
  page = 1;
  pageSize = 6; // quante card per pagina

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    // stato iniziale: tutte le università d'Italia
    this.loadUniversities('Italy');
  }

  // chiamato da CERCA (header)
  onSearch(criteria: { country: string; name: string }): void {
    const country = criteria.country || 'Italy';
    const name = criteria.name?.trim() || '';
    this.loadUniversities(country, name);
  }

  // chiamato da RESET (header)
  resetFilters(): void {
    this.loadUniversities('Italy');
  }

  private loadUniversities(country: string, name?: string): void {
    // ogni volta che ricarico i dati riparto dalla pagina 1
    this.page = 1;

    this.universityService.searchUniversities(country, name).subscribe({
      next: (data: ApiUniversity[]) => {
        this.universities = data.map(u => ({
          country: u.country,
          domain: u.domains?.[0] || '',
          name: u.name,
          website: (u.web_pages?.[0] || '').replace(/^https?:\/\//, '')
        }));
      },
      error: (err: unknown) => {
        console.error('Errore nel caricamento delle università', err);
        this.universities = [];
      }
    });
  }

  // ====== PAGINAZIONE ======

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
