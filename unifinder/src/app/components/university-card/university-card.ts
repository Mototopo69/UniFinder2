import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-university-card',
  standalone: true,
  templateUrl: './university-card.html',
  styleUrl: './university-card.scss'
})
export class UniversityCardComponent {
  @Input() country = '';
  @Input() domain = '';
  @Input() name = '';
  @Input() website = '';
}
