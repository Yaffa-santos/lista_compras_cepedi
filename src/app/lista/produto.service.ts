import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/';

  http: HttpClient;
  userSub: string = '';

  constructor(public auth: AuthService) {
    this.http = inject(HttpClient);
  }

  verifyUser(): Observable<boolean> {
    return new Observable<boolean>(o => {
      this.auth.user$.subscribe(u => {
        const sub = u?.sub;

        if (sub) {
          o.next(true);
          o.complete();
          this.userSub = sub;
        } else {
          o.next(false);
          o.complete();
        }
      });
    });
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/`);
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}