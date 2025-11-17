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
  @Output() search = new EventEmitter<{ name: string; country: string }>();
  @Output() reset = new EventEmitter<void>();

  searchTerm: string = '';
  selectedCountry: string = 'Italy';
  
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
    this.search.emit({
      name: this.searchTerm,
      country: this.selectedCountry
    });
  }

  onCountryChange(): void {
    this.search.emit({
      name: this.searchTerm,
      country: this.selectedCountry
    });
  }

  onResetClick(): void {
    this.searchTerm = '';
    this.selectedCountry = 'Italy';
    this.reset.emit();
  }
}
