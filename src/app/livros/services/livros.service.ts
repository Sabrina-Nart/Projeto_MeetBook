import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosInterface } from '../types/livros.interface';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private url = 'http://localhost:3000/livros';

  constructor(
    private httpClient: HttpClient
  ) {}

  getLivro(): Observable<LivrosInterface[]> {
    return this.httpClient.get<LivrosInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getLivros(id: number): Observable<LivrosInterface> {
    return this.httpClient.get<LivrosInterface>(`${this.url}/${id}`);
  }

  private adicionar(livro: LivrosInterface)  {
    return this.httpClient.post(this.url, livro);
  }

  private atualizar(livro: LivrosInterface) {
    return this.httpClient.put(`${this.url}/${livro.id}`, livro);
  }

  salvar(livro: LivrosInterface) {
    if(livro.id) {
      return this.atualizar(livro);
    } else {
      return this.adicionar(livro);
    }
  }
}
