import { UsuarioReadDTO } from './../../../../DTO/UsuarioDTO/UsuarioReadDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioEditDTO } from 'src/app/DTO/UsuarioDTO/UsuarioEditDTO';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent {
  constructor(private client: HttpClient, private router: Router, private auth: AuthService){}

  usuario: UsuarioFindDTO | null = null

  //Requisitos para aplicar a barra de pesquisa
  //1º- lista de usuarios e uma lista com os usuarios filtrados
  usuarios: UsuarioReadDTO[] = []
  usuariosFiltrados: UsuarioReadDTO[] = []

  //2º- Termo de pesquisa
  private _termoPesquisa: string = ""

  //3º- Getter e Setter para manipular o termo de pesquisa e manipular a lista de usuarios
  //Getter
  public get termoPesquisa(): string{
    return this._termoPesquisa;
  }

  //Setter
  public set termoPesquisa(value: string){
    this._termoPesquisa = value;

    //Caso "termoPesquisa" contenha algum valor a condição é atendida e o filtro é aplicado
    if(value){
      this.usuariosFiltrados = this.filtrarUsuario(this.termoPesquisa)
    }else{
      this.usuariosFiltrados = []
    }
  }

  //4º- metodo que vai aplicar a logica da pesquisa
  filtrarUsuario(termoPesquisa: string): UsuarioReadDTO[]{
    //Recebe o termo de pesquisa e trata alguns casos
    termoPesquisa = termoPesquisa.toLowerCase() //Trasnforma os caracteres em minusculo
    .normalize("NFD")                           //Separa os acentos dos caracteres
    .replace(/[\u0300-\u036f]/g, "")            //Retira os acentos dos caracteres
    .trim()                                     //Remove os espaços vazios

    //Filtro que vai ter a logica da pesquisa
    //o filtro vai selecionar os usuarios pelo UserName e pelo Nome
    return this.usuarios.filter(u => u.userName.toLowerCase().includes(termoPesquisa) ||
      u.nome.toLowerCase().includes(termoPesquisa));

  }

  ngOnInit():void{
    this.client.get<UsuarioReadDTO[]>("https://localhost:7088/api/usuario/listar")
    .subscribe({
      next: (listUsuarios) => {
        this.usuarios = listUsuarios
      },
      error: (erro) => {
        console.log(erro)
      }
    })
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)
  }

  irParaCadastrar():void{
    this.router.navigate(["postagem/cadastrar"]);
  }

  navegarPerfilPage():void{
    this.router.navigate(["perfil"])
  }

  navegarPerfilUserFiltrado(id: number):void{
    this.router.navigate([`perfil/${id}`])
  }
   
}
