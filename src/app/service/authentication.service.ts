import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_CURRENTBAL = ' user_bal';
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

  getTransactions(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}getAllTransactions/${id}`
    );
  }

  getCurrentBalance(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}getCurrentBalance/${id}`);
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(id: number = 0, token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

    this.saveId(id);
  }
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getUserToken(): string | null {
    return window.localStorage.getItem(USER_KEY);
  }

  public saveId(id: number): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, id.toString());
  }

  public saveCurrentBal(amount: number = 0): void {
    window.localStorage.removeItem(USER_CURRENTBAL);
    window.localStorage.setItem(USER_CURRENTBAL, amount.toString());
  }

  public getCurrentBal(amount: number = 0): string | null {
    return window.localStorage.getItem(USER_CURRENTBAL);
  }
}
