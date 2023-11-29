import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosInterface } from '../types/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:3000/usuarios';

  constructor(
    private httpClient: HttpClient
  ) {}

  getUsuarios(): Observable<UsuariosInterface[]> {
    return this.httpClient.get<UsuariosInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getUsuario(id: number): Observable<UsuariosInterface> {
    return this.httpClient.get<UsuariosInterface>(`${this.url}/${id}`);
  }

  private adicionar(usuarios: UsuariosInterface)  {
    return this.httpClient.post(this.url, usuarios);
  }

  private atualizar(usuarios: UsuariosInterface) {
    return this.httpClient.put(`${this.url}/${usuarios.id}`, usuarios);
  }

  salvar(usuarios: UsuariosInterface) {
    if(usuarios.id) {
      return this.atualizar(usuarios);
    } else {
      return this.adicionar(usuarios);
    }
  }
}
