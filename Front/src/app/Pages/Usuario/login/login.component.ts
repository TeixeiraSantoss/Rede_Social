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
        console.log("Login realizado com sucesso ")

        loginInfo.id = dados.id

        //Enviando os dados do usuario para serem salvos no sessionStorage
        this.auth.login(loginInfo)

        //verificando se os dados foram salvos corretamente no sessionStorage
        console.log(this.auth.getUsuario())

        // this.router.navigate(['feed'])
      },
      error:(erro) =>{
        console.log(erro)
      }
    })

  }
}
