import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LivrosInterface} from '../../types/livros.interface';
import { LivrosService } from '../../services/livros.service';
import { GeneroEnum } from '../../types/genero.enum';



@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livroId: number | null;
  livrosForm: FormGroup;
  

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livrosService: LivrosService,
    private router: Router
  ) {
    this.livroId = null;
    this.livrosForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.livroId = parseInt(id);
      this.livrosService.getLivros(this.livroId).subscribe((livros) => {
        this.livrosForm = this.createForm(livros);
      });
    }
  }


  private createForm(livros?: LivrosInterface) {
    return new FormGroup({
      nome: new FormControl(livros?.nome || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
      ]),
      autor: new FormControl(livros?.autor || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(
        livros?.dataNascimento || new Date().toISOString()
      ),
      genero: new FormControl(
        livros?.genero || GeneroEnum.Conto,
        Validators.required
      ),
      descricao: new FormControl(livros?.descricao || '', [
        Validators.maxLength(255), // Ajuste conforme necessário
      ]),
      valor: new FormControl(livros?.valor || 0, [
        Validators.min(1),
        Validators.pattern(/^\d+$/),
      ]),
      
      qtdPaginas: new FormControl(livros?.qtdPaginas || 0, [
        Validators.min(1),
        Validators.pattern(/^\d+$/),
      ]),
      avaliacao: new FormControl(livros?.avaliacao || false),
    });
  }

salvar() {
    const livros: LivrosInterface = {
      ...this.livrosForm.value,
      id: this.livroId,
    };
    
    this.livrosService  .salvar(livros).subscribe(
      () => this.router.navigate(['livros']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o livro: ${livros.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.livrosForm.get('nome');
  }
}
