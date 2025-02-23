import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { INewUser } from '../interfaces/INewUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin = `${environment.apiUrl}/auth/login`
  private apiUrlRegister = `${environment.apiUrl}/auth/register`
  private currentUserSubject: BehaviorSubject<IUser | null>;
  private currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<IUser | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  register(user: INewUser): Observable<any> {
    return this.http.post(this.apiUrlRegister, user, {responseType: 'text'});
  }


  login(user: IUser) {
    return this.http.post(this.apiUrlLogin, user, {responseType: 'text'}).pipe(catchError(this.handleError));
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error);
  }

}
