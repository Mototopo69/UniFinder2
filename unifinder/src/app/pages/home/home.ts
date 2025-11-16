import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { UniversityCardComponent } from '../../components/university-card/university-card';
import { NgFor } from '@angular/common';
import { UniversityService, ApiUniversity } from '../../services/university';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UniversityCardComponent, NgFor],
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

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    // Caricamento iniziale: tutte le uni d'Italia
    this.loadUniversities('Italy');
  }

  onSearch(criteria: { country: string; name: string }): void {
    const country = criteria.country || 'Italy';
    const name = criteria.name?.trim() || '';
    this.loadUniversities(country, name);
  }

  loadUniversities(country: string, name?: string): void {
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
}
