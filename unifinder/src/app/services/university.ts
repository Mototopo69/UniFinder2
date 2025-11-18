import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiUniversity {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
private baseUrl = '/api/universities/search';

  constructor(private http: HttpClient) {}

  searchUniversities(country: string, name?: string): Observable<ApiUniversity[]> {
  const params: any = {};

  if (country && country.trim() !== '') {
    params.country = country;
  }

  if (name && name.trim()) {
    params.name = name.trim();
  }

  return this.http.get<ApiUniversity[]>(this.baseUrl, { params });
}
}
