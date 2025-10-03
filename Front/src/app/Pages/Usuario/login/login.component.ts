import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLoginDTO } from 'src/app/DTO/UsuarioDTO/UsuarioLoginDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private client: HttpClient, private auth: AuthService, private router: Router){}

  //condicional para o indicador de loading
  isLoading: boolean = false

  id: number = 0 
  email: string = ""
  senha: string = ""

  login(): void{
    let loginInfo: UsuarioLoginDTO = {
      id: this.id,
      email: this.email,
      senha: this.senha
    }

    this.client.post<UsuarioLoginDTO>("https://localhost:7088/api/usuario/login", loginInfo)
    .subscribe({
      next:(dados) =>{
        //Dados ja foram enviados para o BackEnd e fluxo de dados já está ocorrendo
        //"isLoading = true" pois aqui é o inicio da minha logica de login
        this.isLoading = true

        //Enviando os dados do usuario para serem salvos no sessionStorage
        //Execultando uma função callback para fazer a navegação
        this.auth.login(dados, () =>{
          //Fim do loading
          this.isLoading = false

          this.router.navigate(['feed'])          
        });     

      },
      error:(erro) =>{
        console.log(erro)
        //Fim do loading
        this.isLoading = false
      }
    })

  }

  irParaCadastrarUsuario(): void{
    this.router.navigate(["usuario/cadastrar"])
  }
}
