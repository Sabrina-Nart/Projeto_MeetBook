import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuariosInterface } from '../../types/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { SexoEnum } from '../../types/sexo.enum';
import { PaisEnum } from '../../types/pais.enum';



@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.scss'],
})
export class UsuariosCadastroComponent implements OnInit {
  usuariosId: number | null;
  usuariosForm: FormGroup;


  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService, 
    private router: Router,
  ) {
    this.usuariosId = null;
    this.usuariosForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.usuariosId = parseInt(id);
      this.usuariosService.getUsuario(this.usuariosId).subscribe((usuarios) => {
        this.usuariosForm = this.createForm(usuarios);
      });
    }
  }  

  private createForm(usuarios?: UsuariosInterface) {
    return new FormGroup({
      nome: new FormControl(usuarios?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      email: new FormControl(usuarios?.email || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
      ]),
      genero: new FormControl(
        usuarios?.genero || SexoEnum.FEMININO,
        Validators.required
      ),
      dataNascimento: new FormControl(
        usuarios?.dataNascimento || new Date().toISOString()
      ),
      pais: new FormControl(
        usuarios?.pais || PaisEnum.BRASIL,
        Validators.required
      ),
      qtdLeituras: new FormControl(
        usuarios?.qtdLeituras || 0, [
        Validators.min(0),
        Validators.pattern(/^\d+$/),
      ]),
      satisfacao: new FormControl(
        usuarios?.satisfacao || false),
    });
  }

  
  salvar() {
    const usuario: UsuariosInterface = {
      ...this.usuariosForm.value,
      id: this.usuariosId,
    };

    this.usuariosService.salvar(usuario).subscribe(
      () => this.router.navigate(['usuarios']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o usuário ${usuario.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.usuariosForm.get('nome');
  }
  get email() {
    return this.usuariosForm.get('email');
  }   
}