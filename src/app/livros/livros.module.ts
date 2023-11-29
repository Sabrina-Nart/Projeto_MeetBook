import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { LivrosPageRoutingModule } from './livros-routing.module';

import { LivrosListaComponent} from './components/livros-lista/livros-lista.page';
import { LivrosCadastroComponent } from './components/livros-cadastro/livros-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    LivrosPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [LivrosListaComponent, LivrosCadastroComponent]
})
export class LivrosPageModule {}
