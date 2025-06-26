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

  get isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token){
      return true;
    }else{
      return false;
    }
  }

  get userName(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).name;
    }else{
      return null;
    }
  }

  // To get all user data
  get userData(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData);
    }else{
      return null;
    }
  }

  get isAdmin(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;
    }else{
      return null;
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
