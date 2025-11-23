import { Injectable } from '@angular/core';                          // decorator per servizi DI
import { HttpClient } from '@angular/common/http';                   // client HTTP Angular
import { Observable } from 'rxjs';                                   // tipo Observable per richieste async

// Interfaccia che descrive la struttura dei dati restituiti dall'API
export interface ApiUniversity {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
}

@Injectable({
  providedIn: 'root',                                                // servizio disponibile in tutta l'app
})
export class UniversityService {

  private baseUrl = '/api/universities/search';                      // endpoint API del backend proxy

  constructor(private http: HttpClient) {}                           // iniezione HttpClient

  // Metodo che effettua una ricerca universitaria richiamando l'API
  searchUniversities(country: string, name?: string): Observable<ApiUniversity[]> {
    const params: any = {};                                          // oggetto parametri querystring

    // Aggiunge il filtro paese se non vuoto
    if (country && country.trim() !== '') {
      params.country = country;
    }

    // Aggiunge il filtro nome se presente
    if (name && name.trim()) {
      params.name = name.trim();
    }

    // GET all'endpoint, passando i parametri della ricerca
    return this.http.get<ApiUniversity[]>(this.baseUrl, { params });
  }
}
