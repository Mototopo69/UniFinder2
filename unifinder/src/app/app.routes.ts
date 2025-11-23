import { Routes } from '@angular/router';                          // tipo Angular per un array di rotte
import { HomeComponent } from './pages/home/home';                 // componente associato alla home

export const routes: Routes = [
  {
    path: '',                                                      // URL root (es. '/')
    component: HomeComponent                                       // mostra HomeComponent quando l'URL è vuoto
  },
  {
    path: '**',                                                    // qualsiasi path non definito (wildcard)
    redirectTo: ''                                                 // reindirizza alla home
  }
];
