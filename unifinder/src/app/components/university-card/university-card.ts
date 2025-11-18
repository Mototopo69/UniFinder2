import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-university-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './university-card.html',
  styleUrl: './university-card.scss'
})
export class UniversityCardComponent {
  @Input() country!: string;
  @Input() domain!: string;
  @Input() name!: string;
  @Input() website!: string;

  @Output() addFavorite = new EventEmitter<void>();

  onAddFavoriteClick(): void {
    this.addFavorite.emit();
  }
}
