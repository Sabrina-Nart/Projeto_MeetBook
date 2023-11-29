import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorInterface } from '../types/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private url = 'http://localhost:3000/autores';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAutores(): Observable<AutorInterface[]> {
    return this.httpClient.get<AutorInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAutor(id: number): Observable<AutorInterface> {
    return this.httpClient.get<AutorInterface>(`${this.url}/${id}`);
  }

  private adicionar(autor: AutorInterface)  {
    return this.httpClient.post(this.url, autor);
  }

  private atualizar(autor: AutorInterface) {
    return this.httpClient.put(`${this.url}/${autor.id}`, autor);
  }

  salvar(autor: AutorInterface) {
    if(autor.id) {
      return this.atualizar(autor);
    } else {
      return this.adicionar(autor);
    }
  }
}
