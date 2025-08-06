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
    return this.http.post(`${this.baseUrl}/usuarios`, data);
  }

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
