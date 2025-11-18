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
  @Output() search = new EventEmitter<{ country: string; name: string }>();
  @Output() reset = new EventEmitter<void>();
  @Output() showFavorites = new EventEmitter<void>();
  @Output() backHome = new EventEmitter<void>();

  searchTerm: string = '';
  selectedCountry: string = 'All';

  showingFavorites: boolean = false;

  countries: string[] = [
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
    this.showingFavorites = false;
    this.search.emit({
      name: this.searchTerm,
      country: this.selectedCountry
    });
  }

  onCountryChange(): void {
    this.showingFavorites = false;
    this.search.emit({
      name: this.searchTerm,
      country: this.selectedCountry
    });
  }

  onResetClick(): void {
    this.searchTerm = '';
    this.selectedCountry = 'All';
    this.showingFavorites = false;
    this.reset.emit();
  }

  onFavoritesClick(): void {
    this.showingFavorites = true;
    this.showFavorites.emit();
  }

  onBackToHomeClick(): void {
    this.showingFavorites = false;
    this.backHome.emit();
  }
}
