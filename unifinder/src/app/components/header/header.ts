import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  @Output() search = new EventEmitter<{ term: string; country: string }>();
  @Output() reset = new EventEmitter<void>();

  searchTerm: string = '';
  selectedCountry: string = 'All';
  
  countries: string[] = [
    'All',
    'Italy',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Canada',
    'Australia',
    // aggiungi altri paesi se necessario
  ];

  onSearchClick(): void {
    this.search.emit({
      term: this.searchTerm,
      country: this.selectedCountry
    });
  }

  onCountryChange(): void {
    this.search.emit({
      term: this.searchTerm,
      country: this.selectedCountry
    });
  }

  // QUESTO È IL METODO CHE MANCAVA!
  onResetClick(): void {
    this.searchTerm = '';
    this.selectedCountry = 'All';
    this.reset.emit();
  }
}