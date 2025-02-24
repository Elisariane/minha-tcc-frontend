import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { INewUser } from '../interfaces/INewUser';
import { jwtDecode } from 'jwt-decode';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin = `${environment.apiUrl}/auth/login`;
  private apiUrlRegister = `${environment.apiUrl}/auth/register`;
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>; 

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<IUser | null>(this.getUserFromToken(''));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: INewUser): Observable<any> {
    return this.http.post(this.apiUrlRegister, user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(user: IUser): Observable<any> {
    return this.http.post(this.apiUrlLogin, user, { responseType: 'text' }).pipe( 
      tap((response: any) => {
        if (response) {
          localStorage.setItem('token', response);
          const userData = this.getUserFromToken(user.email);
          this.currentUserSubject.next(userData);
        }
      }),
      catchError(this.handleError)
    );
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private getUserFromToken(email: string): IUser | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return { 
        name: decoded.sub || 'Usuário',
        email: email
      };
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  private handleError(error: any) {
    console.error('Erro:', error);
    return throwError(() => new Error(error));
  }
}
