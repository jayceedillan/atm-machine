import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl: string = 'https://localhost:7041/api/AtmMachine/';

  constructor(private http: HttpClient) {}

  login(pinNo: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${pinNo}`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.apiUrl}addTransaction`,
      transaction
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}getAllTransactions?pinNo=12345`
    );
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(id: number, token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.saveId(id);
  }
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveId(id: number): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, id.toString());
  }
}
