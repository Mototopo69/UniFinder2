import { Component, Input, Output, EventEmitter } from '@angular/core'; // Input per ricevere dati, Output per eventi verso il padre
import { CommonModule } from '@angular/common';                         // moduli base (template)

@Component({
  selector: 'app-university-card',                                      // tag <app-university-card>
  standalone: true,                                                     // componente standalone
  imports: [CommonModule],
  templateUrl: './university-card.html',
  styleUrl: './university-card.scss'
})
export class UniversityCardComponent {
  @Input() country!: string;                                            // nome del paese
  @Input() domain!: string;                                             // dominio (es. unito.it)
  @Input() name!: string;                                               // nome università
  @Input() website!: string;                                            // sito web (senza protocollo)

  @Output() addFavorite = new EventEmitter<void>();                     // evento per aggiungere/rimuovere dai preferiti

  onAddFavoriteClick(): void {
    this.addFavorite.emit();                                            // avviso il padre che è stato cliccato "Preferiti"
  }
}
