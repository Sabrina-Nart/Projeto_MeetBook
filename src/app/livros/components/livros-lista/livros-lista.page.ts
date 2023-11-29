import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LivrosInterface } from '../../types/livros.interface';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros-lista.page.html',
  styleUrls: ['./livros-lista.page.scss'],
})
export class LivrosListaComponent implements OnInit {
  livros: LivrosInterface[] = [];
  livrosFiltrados: LivrosInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private livrosService: LivrosService
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
    const observable = this.livrosService.getLivro();
    observable.subscribe(
      (dados) => {
        this.livros = dados;
        this.livrosFiltrados = this.livros;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os livros`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(livros: LivrosInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o livro ${livros.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(livros),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(livros: LivrosInterface) {
    if (livros.id) {
      this.livrosService.excluir(livros.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o livro ${livros.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  filtrarLivros(event: any) {
    const termo = event.target.value.toLowerCase();

    if (termo.trim() === '') {
      // Se o termo de pesquisa estiver vazio, exiba todos os livros
      this.livrosFiltrados = this.livros;
    } else {
      // Filtrar livros com base no termo de pesquisa
      this.livrosFiltrados = this.livros.filter((livro) =>
        livro.nome.toLowerCase().includes(termo)
      );
    }
  }

  
}


