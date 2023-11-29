import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivrosCadastroComponent } from './components/livros-cadastro/livros-cadastro.component';

import { LivrosListaComponent } from './components/livros-lista/livros-lista.page';

const routes: Routes = [
  {
    path: '',
    component: LivrosListaComponent
  },
  {
    path: 'cadastro',
    component: LivrosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: LivrosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosPageRoutingModule {}
