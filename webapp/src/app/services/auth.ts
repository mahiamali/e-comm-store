import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../types/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + '/auth/login', {
      email,
      password,
    });
  }
}
