import { Component, OnInit } from '@angular/core';
import {  AlertController,  ToastController, } from '@ionic/angular';
import { UsuariosInterface } from '../../types/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios-lista.page.html',
  styleUrls: ['./usuarios-lista.page.scss'],
})

export class UsuariosListaComponent implements OnInit {
  usuarios: UsuariosInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private usuariosService: UsuariosService
    
  ) {}

  ngOnInit() {
    this.listar();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  listar() {
    const observable = this.usuariosService.getUsuarios();
    observable.subscribe(
      (dados) => {
        this.usuarios = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os usuários`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(usuarios: UsuariosInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o usuarios ${usuarios.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(usuarios),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(usuarios: UsuariosInterface) {
    if (usuarios.id) {
      this.usuariosService.excluir(usuarios.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o usuarios ${usuarios.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
