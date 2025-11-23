import { ApplicationConfig } from '@angular/core';                 // tipo per la configurazione principale dell'app
import { provideRouter } from '@angular/router';                   // abilita il router con le rotte
import { routes } from './app.routes';                             // import delle rotte definite in app.routes.ts
import { provideHttpClient } from '@angular/common/http';          // abilita HttpClient per le richieste HTTP

export const appConfig: ApplicationConfig = {                      // oggetto di configurazione dell'app
  providers: [
    provideRouter(routes),                                         // registra il router con l'array di rotte
    provideHttpClient()                                            // rende HttpClient disponibile via dependency injection
  ],
};
