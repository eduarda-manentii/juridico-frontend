import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private baseUrl = 'https://juridico-backend-production.up.railway.app';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, data, { responseType: 'text' as 'json' });
  }

  patch(endpoint: string, params?: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}${endpoint}`, { params });
  }

   get(endpoint: string, params?: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}${endpoint}`, { headers, params });
  }

  delete(endpoint: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}${endpoint}`, { headers, responseType: 'text' });
  }

  create(endpoint: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}${endpoint}`, data, { headers, responseType: 'text' as 'json' });
  }

  update(endpoint: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}${endpoint}`, data, { headers, responseType: 'text' as 'json' });
  }

   login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
