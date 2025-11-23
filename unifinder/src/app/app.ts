 import { Component, signal } from '@angular/core';                 // Component per definire il componente, signal per stato reattivo
import { RouterOutlet } from '@angular/router';                    // RouterOutlet per iniettare i componenti delle rotte

@Component({
  selector: 'app-root',                                            // tag HTML usato come root (<app-root>)
  imports: [RouterOutlet],                                         // dichiaro che nel template uso RouterOutlet
  templateUrl: './app.html',                                       // file HTML associato a questo componente
  styleUrl: './app.scss'                                           // file SCSS associato
})
export class App {
  protected readonly title = signal('unifinder');                  // segnale reattivo che contiene il titolo (non usato nel template)
}
