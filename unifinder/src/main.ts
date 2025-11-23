import { bootstrapApplication } from '@angular/platform-browser'; // funzione che avvia l'app Angular nel browser
import { appConfig } from './app/app.config';                     // configurazione globale dell'app (router, http, httpclient, ecc.)
import { App } from './app/app';                                  // componente root dell'app

bootstrapApplication(App, appConfig)                              // avvia l'app usando App e la config appConfig
  .catch((err) => console.error(err));                            // se il bootstrap fallisce, logga l'errore in console
