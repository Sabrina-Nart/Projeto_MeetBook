import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule} from './usuarios-routing.module';

import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.page';
import { UsuariosCadastroComponent } from './components/usuarios-cadastro/usuarios-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    UsuariosPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [UsuariosListaComponent, UsuariosCadastroComponent]
})
export class UsuariosPageModule {}
