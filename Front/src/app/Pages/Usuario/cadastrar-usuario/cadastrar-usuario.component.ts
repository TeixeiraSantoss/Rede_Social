import { UsuarioCreateDTO } from './../../../DTO/UsuarioDTO/UsuarioCreateDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
  constructor(private client: HttpClient, private router: Router){}

  //Variavel de controle de visibilidade da senha
  senhaVisivel: boolean = false

  nome: string = ""
  userName: string = ""
  email: string = ""
  senha: string = ""

  cadastrar(): void{

    let novoUsuario: UsuarioCreateDTO = {
      nome: this.nome,
      userName: this.userName,
      email: this.email,
      senha: this.senha
    }

    this.client.post<UsuarioCreateDTO>("https://localhost:7088/api/usuario/cadastrar", novoUsuario)
    .subscribe({
      next: () =>{
        console.log("Usuario cadastrado com sucesso")

        this.router.navigate([""])
      },
      error: (erro) =>{
        console.log(erro)
      }
    })

  }

  toggleSenha(): void{
    //Faz a troca de valor da variavel "senhaVisivel"
    this.senhaVisivel = !this.senhaVisivel
  }
}
