import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private baseUrl = 'https://juridico-backend-production.up.railway.app';

  constructor(private http: HttpClient) {}

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, data, { responseType: 'text' as 'json' });
  }

  patch(endpoint: string, params?: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}${endpoint}`, { params });
  }

  get(endpoint: string, params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, { params });
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`, { responseType: 'text' });
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data, { responseType: 'text' as 'json' });
  }

  update(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, data, { responseType: 'text' as 'json' });
  }

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
