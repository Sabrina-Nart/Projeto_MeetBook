import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosCadastroComponent } from './components/usuarios-cadastro/usuarios-cadastro.component';

import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosListaComponent
  },
  {
    path: 'cadastro',
    component: UsuariosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: UsuariosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
