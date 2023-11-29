import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { AutorInterface } from '../../types/autor.interface';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores-lista.page.html',
  styleUrls: ['./autores-lista.page.scss'],
})
export class AutoresListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  autores: AutorInterface[] = [];
  autoresFiltrados: AutorInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private autorService: AutorService
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

  listar() {
    const observable = this.autorService.getAutores();
    observable.subscribe(
      (dados) => {
        this.autores = dados;
        this.autoresFiltrados = this.autores;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os autores`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(autor: AutorInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o autor ${autor.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(autor),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(autor: AutorInterface) {
    if (autor.id) {
      this.autorService.excluir(autor.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o autor ${autor.nome}`,
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
