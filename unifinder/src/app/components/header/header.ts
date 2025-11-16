import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  searchTerm = '';
  selectedCountry = 'Italy';

  countries: string[] = [
    'Italy',
    'United Kingdom',
    'United States',
    'France',
    'Germany',
    'Spain',
    'Portugal',
    'Netherlands',
    'Sweden',
    'Norway',
    'Finland',
    'Switzerland',
    'Poland',
    'Canada',
    'Australia'
  ];

  @Output() search = new EventEmitter<{ country: string; name: string }>();

  onSearchClick(): void {
    this.search.emit({
      country: this.selectedCountry,
      name: this.searchTerm
    });
  }

  onCountryChange(): void {
    // Se il campo di ricerca è vuoto, cerca tutte le università del paese selezionato
    if (!this.searchTerm.trim()) {
      this.onSearchClick();
    }
  }
}
