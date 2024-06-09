import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Login } from '../model/login';
import { LoginResponse } from '../model/login-response';
import { User } from '../model/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private currentLoginSubject: BehaviorSubject<LoginResponse | null>;
  public currentLogin: Observable<LoginResponse | null>;
  public auth: boolean = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentLoginSubject = new BehaviorSubject<LoginResponse | null>(this.getLoginResponseFromLocalStorage());
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private getLoginResponseFromLocalStorage(): LoginResponse | null {
    const tokenJson = localStorage.getItem('token');
    return tokenJson ? JSON.parse(tokenJson) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentLoginValue(): LoginResponse | null {
    return this.currentLoginSubject.value;
  }

  public get isAuth(): boolean | null {
    this.currentLoginSubject = new BehaviorSubject<LoginResponse | null>(this.getLoginResponseFromLocalStorage());
    return this.currentLoginSubject.value !== null;
  }

  login(login: Login): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.url}auth/login`, login)
      .pipe(
        map(d => {
          if (d.status) {
            this.auth = true;
            localStorage.setItem('token', JSON.stringify(d.data.token));
            this.currentLoginSubject.next(d);
          }
          return d.status;
        }),
        catchError(error => {
          // console.error('An error occurred:', error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.currentLoginSubject.next(null);
  }

}
